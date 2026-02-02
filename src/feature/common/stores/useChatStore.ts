import { create } from 'zustand';

export interface Member {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

interface ChatStore {
  members: Member[];
  isAdmin: boolean;
  chatInfoOpen: boolean;
  selectedChannelId: number | null;
  isLoadingChannel: boolean;

  setSelectedChannelId: (id: number) => void;
  setChannelLoaded: () => void;
  fetchMembers: () => Promise<void>;
  toggleChatInfo: () => void;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const getCurrentUserId = (): number | undefined => {
  const token = localStorage.getItem('access_token');
  const payload = token ? parseJwt(token) : null;
  return payload?.sub;
};

export const useChatStore = create<ChatStore>((set) => ({
  members: [],
  isAdmin: false,
  chatInfoOpen: false,
  selectedChannelId: null,
  isLoadingChannel: false,

  setSelectedChannelId: (id) =>
    set({ selectedChannelId: id, isLoadingChannel: true }),

  setChannelLoaded: () => set({ isLoadingChannel: false }),

  fetchMembers: async () => {
    try {
      const { ChatMember } = await import('@/feature/chat/api/chatApi');
      const response = await ChatMember();

      const members: Member[] = response.data.map(
        (item: {
          user: { id: number; email: string };
          role: 'admin' | 'user';
        }) => ({
          id: item.user.id,
          name: item.user.email,
          role: item.role,
        })
      );

      const currentUserId = getCurrentUserId();
      const currentUser = members.find((member) => member.id === currentUserId);
      const isAdmin = currentUser?.role === 'admin' || false;

      set({ members, isAdmin });
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  },

  toggleChatInfo: () => set((state) => ({ chatInfoOpen: !state.chatInfoOpen })),
}));
