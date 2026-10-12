import { create } from 'zustand';
import { ChatStore, Member } from '@/feature/chat/types';
import { parseJwt } from '@/feature/chat/utils/parseJwt';

const getTokenUser = (): Member | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('access_token');
  const payload = token ? parseJwt(token) : null;
  const id = Number(payload?.sub);

  if (!id) return null;

  return {
    id,
    name: typeof payload?.email === 'string' ? payload.email : '',
    role: 'user',
  };
};

const initialState = {
  serverId: null,
  serverName: null,
  members: [],
  isAdmin: false,
  currentUser: null,
  selectedChannelId: null,
  selectedChannelTypeId: null,
  selectedChannelName: null,
  isLoadingChannel: false,
};

export const useChatStore = create<ChatStore>((set, get) => ({
  ...initialState,

  setServerId: (id, name) =>
    set((state) =>
      state.serverId === id
        ? { serverName: name ?? state.serverName }
        : {
            serverId: id,
            serverName: name ?? null,
            members: [],
            isAdmin: false,
            currentUser: null,
            selectedChannelId: null,
            selectedChannelTypeId: null,
            selectedChannelName: null,
            isLoadingChannel: false,
          }
    ),

  setSelectedChannelId: (id, typeId = null, name = null) =>
    set({
      selectedChannelId: id,
      selectedChannelTypeId: typeId,
      selectedChannelName: name,
      isLoadingChannel: id !== null,
    }),

  setChannelLoaded: () => set({ isLoadingChannel: false }),

  resetChat: () => set(initialState),

  fetchMembers: async () => {
    const { serverId } = get();
    if (!serverId) return;

    const tokenUser = getTokenUser();

    try {
      const { ChatMember } = await import('@/feature/chat/api/chatApi');
      const response = await ChatMember(serverId);

      // სერვერი შეიძლება შეიცვალოს პასუხის მოლოდინში
      if (get().serverId !== serverId) return;

      const members: Member[] = (
        (response.data ?? []) as {
          user: { id: number; email?: string | null };
          role: Member['role'];
        }[]
      ).map((item) => ({
        id: item.user.id,
        name: item.user.email ?? '',
        role: item.role,
      }));

      const currentUser =
        members.find((member) => member.id === tokenUser?.id) ?? tokenUser;

      set({
        members,
        currentUser,
        isAdmin: currentUser?.role === 'admin',
      });
    } catch {
      if (get().serverId !== serverId) return;
      set({ members: [], currentUser: tokenUser, isAdmin: false });
    }
  },
}));
