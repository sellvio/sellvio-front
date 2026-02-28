import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface FeedbackSocketState {
  socket: Socket | null;
  isConnected: boolean;
  serverId: string;
  channelId: string;

  setSocket: (socket: Socket) => void;
  setConnected: (value: boolean) => void;

  submitFeedback: (payload: { title: string; videoUrl: string }) => void;
}

export const useFeedbackSocketStore = create<FeedbackSocketState>(
  (set, get) => ({
    socket: null,
    isConnected: false,
    serverId: '20',
    channelId: '94',

    setSocket: (socket) => set({ socket }),
    setConnected: (value) => set({ isConnected: value }),

    submitFeedback: ({ title, videoUrl }) => {
      const { socket, isConnected, serverId, channelId } = get();

      if (!socket || !isConnected) {
        console.warn('Socket not connected');
        return;
      }

      socket.emit('feedback:submit', {
        channelId: Number(channelId),
        title,
        videoUrl,
      });
    },
  })
);
