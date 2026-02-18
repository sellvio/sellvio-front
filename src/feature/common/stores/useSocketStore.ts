import { create } from 'zustand';
import { io } from 'socket.io-client';
import {
  Message,
  MessageStatus,
  SocketState,
} from '@/feature/chat/components/type';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const MESSAGES_PER_PAGE = 50;

const sortMessagesByDate = (messages: Message[]): Message[] => {
  const map = new Map<string | number, Message>();

  for (const m of messages) {
    const key = m.tempId ?? m.id;
    map.set(key, m);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
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

    const socketInstance = io(`${baseUrl}/chat`, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socketInstance.on('connect', () => {
      set({ isConnected: true });
    });

    socketInstance.on('disconnect', () => {
      set({ isConnected: false });
    });

    socketInstance.on('message:history', (data) => {
      if (!data?.messages) return;

      set((state) => {
        const isFirstLoad = state.messages.length === 0;

        const newMessages = isFirstLoad
          ? data.messages
          : [...data.messages, ...state.messages];

        return {
          messages: sortMessagesByDate(newMessages),
          isLoadingMessages: false,
          hasMore: data.hasMore,
          currentPage: isFirstLoad ? 1 : state.currentPage + 1,
        };
      });
    });

    socketInstance.on('message', (msg: Message) => {
      set((state) => {
        const tempMsgIndex = state.messages.findIndex(
          (m) =>
            m.tempId &&
            m.content === msg.content &&
            m.channelId === msg.channelId &&
            m.status === 'sending'
        );

        let updatedMessages: Message[];

        if (tempMsgIndex !== -1) {
          updatedMessages = state.messages.map((m, idx) =>
            idx === tempMsgIndex
              ? { ...msg, status: 'delivered' as MessageStatus }
              : m
          );
        } else {
          updatedMessages = [
            ...state.messages,
            { ...msg, status: 'delivered' as MessageStatus },
          ];
        }

        return { messages: sortMessagesByDate(updatedMessages) };
      });
    });

    socketInstance.on(
      'message:sent',
      (data: { tempId?: string; message: Message }) => {
        set((state) => {
          if (!data.tempId) return state;

          const updatedMessages = state.messages.map((m) =>
            m.tempId === data.tempId
              ? {
                  ...data.message,
                  status: 'sent' as MessageStatus,
                  tempId: data.tempId,
                }
              : m
          );

          return { messages: sortMessagesByDate(updatedMessages) };
        });
      }
    );

    socketInstance.on(
      'message:delivered',
      (data: { tempId: string; messageId: number }) => {
        set((state) => {
          const updatedMessages = state.messages.map((m) =>
            m.tempId === data.tempId
              ? {
                  ...m,
                  id: data.messageId,
                  status: 'delivered' as MessageStatus,
                }
              : m
          );

          return { messages: sortMessagesByDate(updatedMessages) };
        });
      }
    );

    socketInstance.on(
      'message:error',
      (data: { tempId?: string; error: string }) => {
        console.error('❌ Message error:', data.error);

        set((state) => ({
          messages: state.messages.map((m) =>
            data.tempId && m.tempId === data.tempId
              ? { ...m, status: 'failed' as MessageStatus }
              : m
          ),
        }));
      }
    );

    set({ socket: socketInstance });
  },

  joinServer: (serverId: number) => {
    const socket = get().socket;
    socket?.emit('server:open', { serverId });
  },

  joinChannel: (serverId: number, channelId: number) => {
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
  },

  sendMessage: (channelId: number, content: string) => {
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
    };

    set((state) => ({
      messages: sortMessagesByDate([...state.messages, tempMessage]),
    }));

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

  loadMoreMessages: (channelId: number) => {
    const { socket, isLoadingMessages, hasMore, messages } = get();
    if (!socket || isLoadingMessages || !hasMore) return;

    set({ isLoadingMessages: true });

    const oldestMessageId = messages[0]?.id;

    socket.emit('message:history', {
      channelId,
      beforeId: oldestMessageId,
      limit: MESSAGES_PER_PAGE,
    });
  },

  clearMessages: () => {
    set({
      messages: [],
      isLoadingMessages: false,
      hasMore: true,
      currentPage: 1,
    });
  },

  disconnect: () => {
    const socket = get().socket;
    socket?.disconnect();

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
