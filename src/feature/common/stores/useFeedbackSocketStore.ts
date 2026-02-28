import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FeedbackThread {
  id: number;
  campaignVideoId: number;
  messages: any[];
}

interface FeedbackSocketState {
  socket: Socket | null;
  isConnected: boolean;
  feedbackThreads: FeedbackThread[];
  isLoading: boolean;

  connect: (token: string) => void;
  submitFeedback: (payload: any) => void;
  replyToFeedback: (payload: any) => void;
  reviewFeedback: (payload: any) => void;
  disconnect: () => void;
}

export const useFeedbackSocketStore = create<FeedbackSocketState>(
  (set, get) => ({
    socket: null,
    feedbackThreads: [],
    isConnected: false,
    isLoading: false,

    connect: (token: string) => {
      if (get().socket?.connected) return;

      const socket = io(`${baseUrl}/chat`, {
        auth: { token },
        transports: ['websocket'],
        reconnection: true,
      });

      socket.on('connect', () => {
        set({ isConnected: true });
      });

      socket.on('disconnect', () => {
        set({ isConnected: false });
      });

      socket.on('feedback:thread', (threads: FeedbackThread[]) => {
        set({
          feedbackThreads: threads,
          isLoading: false,
        });
      });

      socket.on('feedback:submit:success', (thread: FeedbackThread) => {
        set((state) => ({
          feedbackThreads: [...state.feedbackThreads, thread],
        }));
      });

      socket.on('feedback:error', (error) => {
        console.error('Feedback error:', error);
      });

      set({ socket });
    },

    submitFeedback: (payload) => {
      const socket = get().socket;
      if (!socket) return;

      set({ isLoading: true });
      socket.emit('feedback:submit', payload);
    },

    replyToFeedback: (payload) => {
      const socket = get().socket;
      socket?.emit('feedback:reply', payload);
    },

    reviewFeedback: (payload) => {
      const socket = get().socket;
      socket?.emit('feedback:review', payload);
    },

    disconnect: () => {
      const socket = get().socket;
      socket?.removeAllListeners();
      socket?.disconnect();

      set({
        socket: null,
        isConnected: false,
        feedbackThreads: [],
        isLoading: false,
      });
    },
  })
);
