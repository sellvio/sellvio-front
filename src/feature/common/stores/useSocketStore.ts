import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  channelId: number;
  senderId: number;
  content: string;
  createdAt: string;
  pinned: boolean;
}

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: Message[];

  connect: (token: string) => void;
  disconnect: () => void;
  joinServer: (serverId: number) => void;
  joinChannel: (serverId: number, channelId: number) => void;
  sendMessage: (channelId: number, content: string) => void;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // დარწმუნდი რომ ეს სწორია

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],

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
      set({ messages: data.messages });
    });

    socketInstance.on('message', (msg: Message) => {
      set((state) => ({ messages: [...state.messages, msg] }));
    });

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
      set({ messages: [] });
      s.emit('channel:open', { serverId, channelId });
    }
  },

  sendMessage: (channelId: number, content: string) => {
    const s = get().socket;
    if (s) {
      s.emit('message:send', { channelId, content });
    }
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, isConnected: false, messages: [] });
  },
}));
