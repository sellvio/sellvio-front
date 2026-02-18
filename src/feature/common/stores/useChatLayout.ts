import { create } from 'zustand';

type ChatLayoutStore = {
  chatFull: boolean;
  toggleChatFull: () => void;
};

export const useChatLayout = create<ChatLayoutStore>((set) => ({
  chatFull: false,
  toggleChatFull: () => set((state) => ({ chatFull: !state.chatFull })),
}));
