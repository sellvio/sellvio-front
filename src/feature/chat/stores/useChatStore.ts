import { create } from 'zustand';
import { ChatStore, Member } from '@/feature/chat/types';
import { parseJwt } from '@/feature/chat/utils/parseJwt';

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

      const members: Member[] = response.data.map((item: any) => ({
        id: item.user.id,
        name: item.user.email,
        role: item.role,
      }));

      const currentUser = members.find((m) => m.id === currentUserId) ?? null;
      set({ members, currentUser, isAdmin: currentUser?.role === 'admin' });
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  },
}));
