'use client';

import { create } from 'zustand';
import { io } from 'socket.io-client';
import {
  Message,
  MessageReaction,
  MessageStatus,
  ReactionUser,
  SocketState,
  VideoStatus,
} from '@/feature/chat/types';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const MESSAGES_PER_PAGE = 50;

type ReactionAddPayload = {
  channelId: number;
  messageId: number;
  emojiId: number;
  emoji: string;
  emojiUrl: string;
  userId: number;
  action: 'add';
};

type ReactionRemovePayload = {
  channelId: number;
  messageId: number;
  emojiId: number;
  userId: number;
};

const sortByDate = (messages: Message[]): Message[] => {
  const map = new Map<string | number, Message>();

  for (const message of messages) {
    map.set(message.tempId ?? message.id, {
      ...message,
      images: message.images ?? [],
      reactions: message.reactions ?? [],
      replyToId: message.replyToId ?? null,
      replyTo: message.replyTo ?? null,
      pinned: Boolean(message.pinned),
    });
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

const videoToMessage = (video: any, channelId: number): Message => ({
  id: video.id,
  channelId,
  senderId: video.creatorId,
  content: video.title ?? '',
  createdAt: video.createdAt,
  pinned: false,
  status: 'delivered' as MessageStatus,
  senderFirstName: video.creatorFirstName,
  senderLastName: video.creatorLastName,
  senderImageUrl: video.creatorImageUrl,
  messageType: 'feedback_video',
  campaignVideoId: video.id,
  videoUrl: video.videoUrl,
  videoTitle: video.title,
  videoCoverUrl: video.coverUrl,
  videoStatus: video.status as VideoStatus,
  images: [],
  reactions: [],
  replyToId: null,
  replyTo: null,
});

const normalizeMessage = (message: Message): Message => ({
  ...message,
  images: message.images ?? [],
  reactions: message.reactions ?? [],
  replyToId: message.replyToId ?? null,
  replyTo: message.replyTo ?? null,
  pinned: Boolean(message.pinned),
});

const addReactionToMessage = (
  message: Message,
  payload: ReactionAddPayload
): Message => {
  if (message.id !== payload.messageId) return message;

  const reactions = message.reactions ?? [];
  const existingReactionIndex = reactions.findIndex(
    (reaction) => reaction.emojiId === payload.emojiId
  );

  if (existingReactionIndex === -1) {
    const nextReaction: MessageReaction = {
      emojiId: payload.emojiId,
      emoji: payload.emoji,
      emojiUrl: payload.emojiUrl,
      users: [{ id: payload.userId, firstName: null }],
    };

    return {
      ...message,
      reactions: [...reactions, nextReaction],
    };
  }

  const nextReactions = reactions.map((reaction, index) => {
    if (index !== existingReactionIndex) return reaction;

    const alreadyExists = reaction.users.some(
      (user) => user.id === payload.userId
    );
    if (alreadyExists) return reaction;

    const nextUser: ReactionUser = {
      id: payload.userId,
      firstName: null,
    };

    return {
      ...reaction,
      users: [...reaction.users, nextUser],
    };
  });

  return {
    ...message,
    reactions: nextReactions,
  };
};

const removeReactionFromMessage = (
  message: Message,
  payload: ReactionRemovePayload
): Message => {
  if (message.id !== payload.messageId) return message;

  const reactions = message.reactions ?? [];

  const nextReactions = reactions
    .map((reaction) => {
      if (reaction.emojiId !== payload.emojiId) return reaction;

      return {
        ...reaction,
        users: reaction.users.filter((user) => user.id !== payload.userId),
      };
    })
    .filter((reaction) => reaction.users.length > 0);

  return {
    ...message,
    reactions: nextReactions,
  };
};

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],
  isLoadingMessages: false,
  hasMore: true,
  currentPage: 1,

  connect: (token: string) => {
    if (typeof window === 'undefined' || get().socket?.connected) return;

    const socket = io(`${baseUrl}/chat`, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socket.on('connect', () => set({ isConnected: true }));
    socket.on('disconnect', () => set({ isConnected: false }));

    socket.on('message:history', (data) => {
      if (!data?.messages) return;

      const normalizedMessages: Message[] = data.messages.map(normalizeMessage);

      set((state) => {
        const isFirst = state.messages.length === 0;

        return {
          messages: sortByDate(
            isFirst
              ? normalizedMessages
              : [...normalizedMessages, ...state.messages]
          ),
          isLoadingMessages: false,
          hasMore: Boolean(data.hasMore),
          currentPage: isFirst ? 1 : state.currentPage + 1,
        };
      });
    });

    socket.on('feedback:videos', (data) => {
      if (!data?.videos?.length) return;

      const videoMessages: Message[] = data.videos.map((video: any) =>
        videoToMessage(video, data.channelId)
      );

      set((state) => ({
        messages: sortByDate([...state.messages, ...videoMessages]),
        isLoadingMessages: false,
      }));
    });

    socket.on('message', (incomingMessage: Message) => {
      const msg = normalizeMessage(incomingMessage);

      set((state) => {
        const tempIndex = state.messages.findIndex(
          (message) =>
            message.tempId &&
            message.content === msg.content &&
            message.channelId === msg.channelId &&
            message.status === 'sending'
        );

        const updatedMessages =
          tempIndex !== -1
            ? state.messages.map((message, index) =>
                index === tempIndex
                  ? {
                      ...msg,
                      status: 'delivered' as MessageStatus,
                    }
                  : message
              )
            : [
                ...state.messages,
                {
                  ...msg,
                  status: 'delivered' as MessageStatus,
                },
              ];

        return { messages: sortByDate(updatedMessages) };
      });
    });

    socket.on('feedback:submitted', (data) => {
      if (!data?.video) return;

      const msg = videoToMessage(data.video, data.channelId);

      set((state) => ({
        messages: sortByDate([...state.messages, msg]),
      }));
    });

    socket.on('feedback:reviewed', (data) => {
      if (!data?.campaignVideoId) return;

      set((state) => ({
        messages: state.messages.map((message) =>
          message.campaignVideoId === data.campaignVideoId
            ? { ...message, videoStatus: data.status }
            : message
        ),
      }));
    });

    socket.on('message:reaction', (payload: ReactionAddPayload) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          addReactionToMessage(message, payload)
        ),
      }));
    });

    socket.on('message:reaction:removed', (payload: ReactionRemovePayload) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          removeReactionFromMessage(message, payload)
        ),
      }));
    });

    socket.on(
      'message:deleted',
      (payload: { channelId: number; messageId: number }) => {
        set((state) => ({
          messages: state.messages.filter(
            (message) => message.id !== payload.messageId
          ),
        }));
      }
    );

    socket.on('message:pinned', (payload: Message) => {
      const normalized = normalizeMessage(payload);

      set((state) => ({
        messages: state.messages.map((message) =>
          message.id === normalized.id
            ? { ...message, pinned: normalized.pinned }
            : message
        ),
      }));
    });

    socket.on('message:error', () => {
      set((state) => ({
        messages: state.messages.map((message) =>
          message.status === 'sending'
            ? { ...message, status: 'failed' as MessageStatus }
            : message
        ),
      }));
    });

    set({ socket });
  },

  joinServer: (serverId) => {
    get().socket?.emit('server:open', { serverId });
  },

  joinChannel: (serverId, channelId, channelTypeId?: number) => {
    const socket = get().socket;
    if (!socket) return;

    set({
      messages: [],
      isLoadingMessages: true,
      hasMore: true,
      currentPage: 1,
    });

    socket.emit('channel:open', {
      serverId,
      channelId,
      limit: MESSAGES_PER_PAGE,
    });

    if (channelTypeId === 3) {
      socket.emit('feedback:videos', { channelId });
    }
  },

  sendMessage: (channelId, content) => {
    const socket = get().socket;
    if (!socket) return;

    const tempId = `temp_${Date.now()}_${Math.random()}`;

    const tempMessage: Message = {
      id: Date.now(),
      channelId,
      senderId: -1,
      content,
      createdAt: new Date().toISOString(),
      pinned: false,
      status: 'sending',
      tempId,
      images: [],
      reactions: [],
      replyToId: null,
      replyTo: null,
    };

    set((state) => ({
      messages: sortByDate([...state.messages, tempMessage]),
    }));

    socket.emit('message:send', { channelId, content });

    setTimeout(() => {
      set((state) => ({
        messages: state.messages.map((message) =>
          message.tempId === tempId && message.status === 'sending'
            ? { ...message, status: 'sent' as MessageStatus }
            : message
        ),
      }));
    }, 5000);
  },

  submitFeedback: (channelId, title, videoUrl) => {
    const { socket, isConnected } = get();
    if (!socket || !isConnected) return;

    socket.emit('feedback:submit', {
      channelId,
      title,
      videoUrl,
    });
  },

  addReaction: (channelId, messageId, emojiId) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit('reaction:add', {
      channelId,
      messageId,
      emojiId,
    });
  },

  removeReaction: (channelId, messageId, emojiId) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit('reaction:remove', {
      channelId,
      messageId,
      emojiId,
    });
  },

  loadMoreMessages: (channelId) => {
    const { socket, isLoadingMessages, hasMore, messages } = get();
    if (!socket || isLoadingMessages || !hasMore) return;

    set({ isLoadingMessages: true });

    socket.emit('message:history', {
      channelId,
      beforeId: messages[0]?.id,
      limit: MESSAGES_PER_PAGE,
    });
  },

  clearMessages: () =>
    set({
      messages: [],
      isLoadingMessages: false,
      hasMore: true,
      currentPage: 1,
    }),

  disconnect: () => {
    get().socket?.disconnect();

    set({
      socket: null,
      isConnected: false,
      messages: [],
      isLoadingMessages: false,
      hasMore: true,
      currentPage: 1,
    });
  },
}));
