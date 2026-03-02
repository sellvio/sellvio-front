'use client';

import { create } from 'zustand';
import { io } from 'socket.io-client';
import {
  Message,
  MessageStatus,
  SocketState,
  VideoStatus,
} from '@/feature/chat/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const MESSAGES_PER_PAGE = 50;

const sortByDate = (messages: Message[]): Message[] => {
  const map = new Map<string | number, Message>();
  for (const m of messages) map.set(m.tempId ?? m.id, m);
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
});

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],
  isLoadingMessages: false,
  hasMore: true,
  currentPage: 1,

  connect: (token: string) => {
    if (typeof window === 'undefined' || get().socket?.connected) return;

    const socket = io(`${BASE_URL}/chat`, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socket.on('connect', () => set({ isConnected: true }));
    socket.on('disconnect', () => set({ isConnected: false }));

    socket.on('message:history', (data) => {
      if (!data?.messages) return;
      set((state) => {
        const isFirst = state.messages.length === 0;
        return {
          messages: sortByDate(
            isFirst ? data.messages : [...data.messages, ...state.messages]
          ),
          isLoadingMessages: false,
          hasMore: data.hasMore,
          currentPage: isFirst ? 1 : state.currentPage + 1,
        };
      });
    });

    socket.on('feedback:videos', (data) => {
      if (!data?.videos?.length) return;
      const videoMessages = data.videos.map((v: any) =>
        videoToMessage(v, data.channelId)
      );
      set((state) => ({
        messages: sortByDate([...state.messages, ...videoMessages]),
        isLoadingMessages: false,
      }));
    });

    socket.on('message', (msg: Message) => {
      set((state) => {
        const idx = state.messages.findIndex(
          (m) =>
            m.tempId &&
            m.content === msg.content &&
            m.channelId === msg.channelId &&
            m.status === 'sending'
        );
        const updated =
          idx !== -1
            ? state.messages.map((m, i) =>
                i === idx ? { ...msg, status: 'delivered' as MessageStatus } : m
              )
            : [
                ...state.messages,
                { ...msg, status: 'delivered' as MessageStatus },
              ];
        return { messages: sortByDate(updated) };
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
        messages: state.messages.map((m) =>
          m.campaignVideoId === data.campaignVideoId
            ? { ...m, videoStatus: data.status }
            : m
        ),
      }));
    });

    socket.on('message:sent', (data: { tempId?: string; message: Message }) => {
      if (!data.tempId) return;
      set((state) => ({
        messages: sortByDate(
          state.messages.map((m) =>
            m.tempId === data.tempId
              ? {
                  ...data.message,
                  status: 'sent' as MessageStatus,
                  tempId: data.tempId,
                }
              : m
          )
        ),
      }));
    });

    socket.on(
      'message:delivered',
      (data: { tempId: string; messageId: number }) => {
        set((state) => ({
          messages: sortByDate(
            state.messages.map((m) =>
              m.tempId === data.tempId
                ? {
                    ...m,
                    id: data.messageId,
                    status: 'delivered' as MessageStatus,
                  }
                : m
            )
          ),
        }));
      }
    );

    socket.on('message:error', (data: { tempId?: string }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          data.tempId && m.tempId === data.tempId
            ? { ...m, status: 'failed' as MessageStatus }
            : m
        ),
      }));
    });

    set({ socket });
  },

  joinServer: (serverId) => get().socket?.emit('server:open', { serverId }),

  joinChannel: (serverId, channelId, channelTypeId) => {
    const { socket } = get();
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
    if (channelTypeId === 3) socket.emit('feedback:videos', { channelId });
  },

  sendMessage: (channelId, content) => {
    const { socket } = get();
    if (!socket) return;
    const tempId = `temp_${Date.now()}_${Math.random()}`;
    const temp: Message = {
      id: Date.now(),
      channelId,
      senderId: -1,
      content,
      createdAt: new Date().toISOString(),
      pinned: false,
      status: 'sending',
      tempId,
    };
    set((state) => ({ messages: sortByDate([...state.messages, temp]) }));
    socket.emit('message:send', { channelId, content, tempId });
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m.tempId === tempId && m.status === 'sending'
            ? { ...m, status: 'sent' as MessageStatus }
            : m
        ),
      }));
    }, 5000);
  },

  submitFeedback: (channelId, title, videoUrl) => {
    const { socket, isConnected } = get();
    if (!socket || !isConnected) return;
    socket.emit('feedback:submit', { channelId, title, videoUrl });
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
