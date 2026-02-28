import { create } from 'zustand';

type Member = {
  id: number;
  name: string;
  role: 'admin' | 'user';
};

type ChatStore = {
  serverId: number | null;
  members: Member[];
  isAdmin: boolean;
  currentUser: Member | null;
  selectedChannelId: number | null;
  selectedChannelTypeId: number | null;
  isLoadingChannel: boolean;
  setServerId: (id: number) => void;
  setSelectedChannelId: (id: number | null, typeId?: number | null) => void;
  setChannelLoaded: () => void;
  fetchMembers: () => Promise<void>;
};

const parseJwt = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split('.')[1]));
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
  selectedChannelTypeId: null,
  isLoadingChannel: false,

  setServerId: (id) => set({ serverId: id }),

  setSelectedChannelId: (id, typeId = null) =>
    set({
      selectedChannelId: id,
      selectedChannelTypeId: typeId,
      isLoadingChannel: true,
    }),

  setChannelLoaded: () => set({ isLoadingChannel: false }),

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
        members.find((m: Member) => m.id === currentUserId) ?? null;
      set({ members, currentUser, isAdmin: currentUser?.role === 'admin' });
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  },
}));
