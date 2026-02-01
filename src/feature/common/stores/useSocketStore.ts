import { create } from 'zustand';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  connect: (token: string) => void;
  disconnect: () => void;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,

  connect: (token: string) => {
    if (typeof window === 'undefined') return;

    if (get().socket?.connected) return;

    const socketInstance = io(`${baseUrl}/chat`, {
      auth: { token },
      transports: ['polling', 'websocket'],
      reconnection: true,
    });

    socketInstance.on('connect', () => {
      set({ isConnected: true });
      console.log('Socket Connected');
    });

    socketInstance.on('disconnect', () => {
      set({ isConnected: false });
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Socket error:', err);
      set({ isConnected: false });
    });

    set({ socket: socketInstance });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, isConnected: false });
  },
}));
