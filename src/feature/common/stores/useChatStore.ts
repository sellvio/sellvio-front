import { create } from 'zustand';

interface Member {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

interface ChatStore {
  serverId: number | null;
  members: Member[];
  isAdmin: boolean;
  currentUser: Member | null;
  selectedChannelId: number | null;
  setServerId: (id: number) => void;
  setSelectedChannelId: (id: number | null) => void;
  fetchMembers: () => Promise<void>;
}

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    return JSON.parse(window.atob(base64Url));
  } catch {
    return null;
  }
};

export const useChatStore = create<ChatStore>((set, get) => ({
  serverId: null,
  members: [],
  isAdmin: false,
  currentUser: null,
  selectedChannelId: null,

  setServerId: (id: number) => set({ serverId: id }),
  setSelectedChannelId: (id) => set({ selectedChannelId: id }),

  fetchMembers: async () => {
    const { serverId } = get();
    if (!serverId) return;

    try {
      const { ChatMember } = await import('@/feature/chat/api/chatApi');
      const response = await ChatMember(serverId);

      const token = localStorage.getItem('access_token');
      const currentUserId = token ? parseJwt(token)?.sub : null;

      const members = response.data.map((item: any) => ({
        id: item.user.id,
        name: item.user.email,
        role: item.role,
      }));

      const currentUser =
        members.find((m: Member) => m.id === currentUserId) || null;

      set({
        members,
        currentUser,
        isAdmin: currentUser?.role === 'admin',
      });
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  },
}));
