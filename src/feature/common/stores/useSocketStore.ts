import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed';

interface Message {
  id: number;
  channelId: number;
  senderId: number;
  content: string;
  createdAt: string;
  pinned: boolean;
  status?: MessageStatus;
  tempId?: string;
}

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: Message[];
  isLoadingMessages: boolean;
  hasMore: boolean;
  currentPage: number;

  connect: (token: string) => void;
  disconnect: () => void;
  joinServer: (serverId: number) => void;
  joinChannel: (serverId: number, channelId: number) => void;
  sendMessage: (channelId: number, content: string) => void;
  loadMoreMessages: (channelId: number) => void;
  clearMessages: () => void;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const MESSAGES_PER_PAGE = 20;

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
      console.log('Socket Connected:', socketInstance.id);
      set({ isConnected: true });
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket Disconnected');
      set({ isConnected: false });
    });

    socketInstance.on('message:history', (data: { messages: Message[] }) => {
      set({
        messages: data.messages.reverse(),
        isLoadingMessages: false,
        hasMore: data.messages.length === MESSAGES_PER_PAGE,
      });
    });

    socketInstance.on('message:more', (data: { messages: Message[] }) => {
      set((state) => ({
        messages: [...data.messages.reverse(), ...state.messages],
        isLoadingMessages: false,
        hasMore: data.messages.length === MESSAGES_PER_PAGE,
        currentPage: state.currentPage + 1,
      }));
    });

    socketInstance.on('message', (msg: Message) => {
      console.log('📨 Received message from server:', msg);

      set((state) => {
        const tempMessages = state.messages.filter((m) => m.tempId);
        console.log('🔍 Current temp messages:', tempMessages);

        const tempMsgIndex = state.messages.findIndex(
          (m) =>
            m.tempId &&
            m.content === msg.content &&
            m.channelId === msg.channelId &&
            m.status === 'sending'
        );

        console.log('🔍 Found temp message at index:', tempMsgIndex);

        if (tempMsgIndex !== -1) {
          const updated = [...state.messages];
          updated[tempMsgIndex] = {
            ...msg,
            status: 'delivered',
            tempId: state.messages[tempMsgIndex].tempId,
          };
          console.log(
            '✅ Updated temp message to delivered:',
            updated[tempMsgIndex]
          );
          return { messages: updated };
        }

        console.log('➕ Adding new message from other user');
        return {
          messages: [...state.messages, { ...msg, status: 'delivered' }],
        };
      });
    });

    socketInstance.on(
      'message:sent',
      (data: { tempId?: string; message: Message }) => {
        console.log('✉️ Message sent confirmation:', data);

        set((state) => {
          if (data.tempId) {
            const index = state.messages.findIndex(
              (m) => m.tempId === data.tempId
            );
            if (index !== -1) {
              const updated = [...state.messages];
              updated[index] = {
                ...data.message,
                status: 'sent',
                tempId: data.tempId,
              };
              return { messages: updated };
            }
          }
          return state;
        });
      }
    );

    socketInstance.on(
      'message:delivered',
      (data: { tempId: string; messageId: number }) => {
        console.log('✅ Message delivered confirmation:', data);

        set((state) => ({
          messages: state.messages.map((m) =>
            m.tempId === data.tempId
              ? { ...m, id: data.messageId, status: 'delivered' }
              : m
          ),
        }));
      }
    );

    socketInstance.on(
      'message:error',
      (data: { tempId?: string; error: string }) => {
        console.log('❌ Message error:', data);

        set((state) => ({
          messages: state.messages.map((m) =>
            data.tempId && m.tempId === data.tempId
              ? { ...m, status: 'failed' }
              : m
          ),
        }));
      }
    );

    set({ socket: socketInstance });
  },

  joinServer: (serverId: number) => {
    const s = get().socket;
    if (s) {
      s.emit('server:open', { serverId });
    }
  },

  joinChannel: (serverId: number, channelId: number) => {
    const s = get().socket;
    if (s) {
      set({
        messages: [],
        isLoadingMessages: true,
        hasMore: true,
        currentPage: 1,
      });
      s.emit('channel:open', { serverId, channelId, limit: MESSAGES_PER_PAGE });
    }
  },

  sendMessage: (channelId: number, content: string) => {
    const s = get().socket;
    if (s) {
      const tempId = `temp_${Date.now()}_${Math.random()}`;
      const tempMessage: Message = {
        id: Date.now(), // დროებითი ID
        channelId,
        senderId: -1,
        content,
        createdAt: new Date().toISOString(),
        pinned: false,
        status: 'sending',
        tempId,
      };

      console.log('📤 Sending message with tempId:', tempId);

      set((state) => ({
        messages: [...state.messages, tempMessage],
      }));

      s.emit('message:send', { channelId, content, tempId });

      setTimeout(() => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.tempId === tempId && m.status === 'sending'
              ? { ...m, status: 'sent' }
              : m
          ),
        }));
      }, 5000);
    }
  },

  loadMoreMessages: (channelId: number) => {
    const s = get().socket;
    const { isLoadingMessages, hasMore, currentPage } = get();

    if (s && !isLoadingMessages && hasMore) {
      set({ isLoadingMessages: true });
      s.emit('channel:loadMore', {
        channelId,
        page: currentPage + 1,
        limit: MESSAGES_PER_PAGE,
      });
    }
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
