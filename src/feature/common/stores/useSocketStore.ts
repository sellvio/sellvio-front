'use client';

import { create } from 'zustand';
import { io } from 'socket.io-client';
import {
  Message,
  MessageReaction,
  MessageStatus,
  PendingReactionOperation,
  ReactionUser,
  SocketState,
  VideoStatus,
} from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { REACTION_OPTIONS } from '../data/reactionOptions';

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

const getPinnedStorageKey = (channelId: number) => `chat:pinned:${channelId}`;

const getPinnedIdsSet = (channelId: number): Set<number> => {
  if (typeof window === 'undefined') return new Set();

  try {
    const raw = localStorage.getItem(getPinnedStorageKey(channelId));
    if (!raw) return new Set();

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(parsed.filter((id) => typeof id === 'number'));
  } catch {
    return new Set();
  }
};

const setPinnedIdsSet = (channelId: number, ids: Set<number>) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(
      getPinnedStorageKey(channelId),
      JSON.stringify(Array.from(ids))
    );
  } catch {
    //
  }
};

const addPinnedIdToStorage = (channelId: number, messageId: number) => {
  const ids = getPinnedIdsSet(channelId);
  ids.add(messageId);
  setPinnedIdsSet(channelId, ids);
};

const removePinnedIdFromStorage = (channelId: number, messageId: number) => {
  const ids = getPinnedIdsSet(channelId);
  ids.delete(messageId);
  setPinnedIdsSet(channelId, ids);
};

const applyStoredPinnedStateForChannel = (
  channelId: number,
  messages: Message[]
): Message[] => {
  const storedPinnedIds = getPinnedIdsSet(channelId);

  return messages.map((message) => ({
    ...message,
    pinned: Boolean(message.pinned) || storedPinnedIds.has(message.id),
  }));
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

const normalizeMessage = (message: Message): Message => ({
  ...message,
  images: message.images ?? [],
  reactions: message.reactions ?? [],
  replyToId: message.replyToId ?? null,
  replyTo: message.replyTo ?? null,
  pinned: Boolean(message.pinned),
});

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

const getReactionMeta = (emojiId: number) => {
  const fallback = REACTION_OPTIONS.find((item) => item.id === emojiId);

  return {
    emoji: fallback?.label ?? `emoji-${emojiId}`,
    emojiUrl: '',
  };
};

const addReactionLocally = (
  message: Message,
  payload: {
    messageId: number;
    emojiId: number;
    userId: number;
    firstName?: string | null;
    emoji?: string;
    emojiUrl?: string;
  }
): Message => {
  if (message.id !== payload.messageId) return message;

  const currentReactions = message.reactions ?? [];
  const reactionIndex = currentReactions.findIndex(
    (reaction) => reaction.emojiId === payload.emojiId
  );

  if (reactionIndex === -1) {
    const nextReaction: MessageReaction = {
      emojiId: payload.emojiId,
      emoji: payload.emoji ?? getReactionMeta(payload.emojiId).emoji,
      emojiUrl: payload.emojiUrl ?? getReactionMeta(payload.emojiId).emojiUrl,
      users: [
        {
          id: payload.userId,
          firstName: payload.firstName ?? null,
        },
      ],
    };

    return {
      ...message,
      reactions: [...currentReactions, nextReaction],
    };
  }

  const nextReactions = currentReactions.map((reaction, index) => {
    if (index !== reactionIndex) return reaction;

    const alreadyExists = reaction.users.some(
      (user) => user.id === payload.userId
    );

    if (alreadyExists) return reaction;

    const nextUser: ReactionUser = {
      id: payload.userId,
      firstName: payload.firstName ?? null,
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

const removeReactionLocally = (
  message: Message,
  payload: {
    messageId: number;
    emojiId: number;
    userId: number;
  }
): Message => {
  if (message.id !== payload.messageId) return message;

  const currentReactions = message.reactions ?? [];

  const nextReactions = currentReactions
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

const removeMatchingPendingOperation = (
  operations: PendingReactionOperation[],
  payload: {
    channelId: number;
    messageId: number;
    emojiId: number;
    userId: number;
    action: 'add' | 'remove';
  }
) => {
  const index = operations.findIndex(
    (operation) =>
      operation.channelId === payload.channelId &&
      operation.messageId === payload.messageId &&
      operation.emojiId === payload.emojiId &&
      operation.userId === payload.userId &&
      operation.action === payload.action
  );

  if (index === -1) return operations;

  return operations.filter((_, currentIndex) => currentIndex !== index);
};

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],
  isLoadingMessages: false,
  hasMore: true,
  currentPage: 1,
  pendingReactionOperations: [],
  pendingPinMessageIds: [],

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
      if (!data?.messages || !data?.channelId) return;

      const normalizedMessages: Message[] = applyStoredPinnedStateForChannel(
        data.channelId,
        data.messages.map(normalizeMessage)
      );

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
      const message = normalizeMessage(incomingMessage);

      set((state) => {
        const sendingIndex = state.messages.findIndex(
          (item) =>
            item.tempId &&
            item.content === message.content &&
            item.channelId === message.channelId &&
            item.status === 'sending'
        );

        const nextMessages =
          sendingIndex !== -1
            ? state.messages.map((item, index) =>
                index === sendingIndex
                  ? {
                      ...message,
                      status: 'delivered' as MessageStatus,
                    }
                  : item
              )
            : [
                ...state.messages,
                {
                  ...message,
                  status: 'delivered' as MessageStatus,
                },
              ];

        return {
          messages: sortByDate(nextMessages),
        };
      });
    });

    socket.on('feedback:submitted', (data) => {
      if (!data?.video) return;

      set((state) => ({
        messages: sortByDate([
          ...state.messages,
          videoToMessage(data.video, data.channelId),
        ]),
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
          addReactionLocally(message, {
            messageId: payload.messageId,
            emojiId: payload.emojiId,
            userId: payload.userId,
            firstName: null,
            emoji: payload.emoji,
            emojiUrl: payload.emojiUrl,
          })
        ),
        pendingReactionOperations: removeMatchingPendingOperation(
          state.pendingReactionOperations,
          {
            channelId: payload.channelId,
            messageId: payload.messageId,
            emojiId: payload.emojiId,
            userId: payload.userId,
            action: 'add',
          }
        ),
      }));
    });

    socket.on('message:reaction:removed', (payload: ReactionRemovePayload) => {
      set((state) => ({
        messages: state.messages.map((message) =>
          removeReactionLocally(message, {
            messageId: payload.messageId,
            emojiId: payload.emojiId,
            userId: payload.userId,
          })
        ),
        pendingReactionOperations: removeMatchingPendingOperation(
          state.pendingReactionOperations,
          {
            channelId: payload.channelId,
            messageId: payload.messageId,
            emojiId: payload.emojiId,
            userId: payload.userId,
            action: 'remove',
          }
        ),
      }));
    });

    socket.on('message:deleted', (payload: { messageId: number }) => {
      set((state) => ({
        messages: state.messages.filter(
          (message) => message.id !== payload.messageId
        ),
      }));
    });

    socket.on('message:pinned', (payload: Message) => {
      const normalized = normalizeMessage(payload);

      if (normalized.pinned) {
        addPinnedIdToStorage(normalized.channelId, normalized.id);
      } else {
        removePinnedIdFromStorage(normalized.channelId, normalized.id);
      }

      set((state) => ({
        messages: sortByDate(
          state.messages.map((message) =>
            message.id === normalized.id
              ? {
                  ...message,
                  ...normalized,
                  pinned: normalized.pinned,
                }
              : message
          )
        ),
        pendingPinMessageIds: state.pendingPinMessageIds.filter(
          (id) => id !== normalized.id
        ),
      }));
    });

    socket.on('error', () => {
      set({
        isLoadingMessages: false,
        pendingPinMessageIds: [],
      });
    });

    set({ socket });
  },

  joinServer: (serverId) => {
    get().socket?.emit('server:open', { serverId });
  },

  joinChannel: (serverId, channelId, channelTypeId) => {
    const socket = get().socket;
    if (!socket) return;

    set({
      messages: [],
      isLoadingMessages: true,
      hasMore: true,
      currentPage: 1,
      pendingReactionOperations: [],
      pendingPinMessageIds: [],
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
    const currentUser = useChatStore.getState().currentUser;

    if (!socket || !currentUser) return;

    const operationId = `reaction_add_${Date.now()}_${Math.random()}`;

    set((state) => ({
      messages: state.messages.map((message) =>
        addReactionLocally(message, {
          messageId,
          emojiId,
          userId: currentUser.id,
          firstName: currentUser.name ?? null,
        })
      ),
      pendingReactionOperations: [
        ...state.pendingReactionOperations,
        {
          operationId,
          channelId,
          messageId,
          emojiId,
          userId: currentUser.id,
          action: 'add',
        },
      ],
    }));

    socket.emit('reaction:add', {
      channelId,
      messageId,
      emojiId,
    });
  },

  removeReaction: (channelId, messageId, emojiId) => {
    const socket = get().socket;
    const currentUser = useChatStore.getState().currentUser;

    if (!socket || !currentUser) return;

    const operationId = `reaction_remove_${Date.now()}_${Math.random()}`;

    set((state) => ({
      messages: state.messages.map((message) =>
        removeReactionLocally(message, {
          messageId,
          emojiId,
          userId: currentUser.id,
        })
      ),
      pendingReactionOperations: [
        ...state.pendingReactionOperations,
        {
          operationId,
          channelId,
          messageId,
          emojiId,
          userId: currentUser.id,
          action: 'remove',
        },
      ],
    }));

    socket.emit('reaction:remove', {
      channelId,
      messageId,
      emojiId,
    });
  },

  pinMessage: (channelId, messageId, pinned) => {
    const socket = get().socket;
    if (!socket) return;

    if (pinned) {
      addPinnedIdToStorage(channelId, messageId);
    } else {
      removePinnedIdFromStorage(channelId, messageId);
    }

    set((state) => ({
      messages: sortByDate(
        state.messages.map((message) =>
          message.id === messageId ? { ...message, pinned } : message
        )
      ),
      pendingPinMessageIds: state.pendingPinMessageIds.includes(messageId)
        ? state.pendingPinMessageIds
        : [...state.pendingPinMessageIds, messageId],
    }));

    socket.emit('message:pin', {
      channelId,
      messageId,
      pinned,
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
      pendingReactionOperations: [],
      pendingPinMessageIds: [],
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
      pendingReactionOperations: [],
      pendingPinMessageIds: [],
    });
  },
}));
