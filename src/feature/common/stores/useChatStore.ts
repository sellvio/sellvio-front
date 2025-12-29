import { create } from 'zustand';
import { ChatMember } from '../../../../feature/chat/api/chatApi';
import { ChatStore, Member } from '../type';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export const useChatStore = create<ChatStore>((set) => ({
  members: [],
  isAdmin: false,
  chatInfoOpen: false,

  fetchMembers: async () => {
    try {
      const response = await ChatMember();

      const membersArray: Member[] = response.data.map(
        (item: {
          user: { id: number; email: string };
          role: 'admin' | 'user';
        }) => ({
          id: item.user.id,
          name: item.user.email,
          role: item.role,
        })
      );

      set({ members: membersArray });

      const token = localStorage.getItem('access_token');
      const payload = token ? parseJwt(token) : null;
      const currentUserId = payload?.sub as number | undefined;

      const currentUser = membersArray.find(
        (member) => member.id === currentUserId
      );

      set({ isAdmin: currentUser?.role === 'admin' || false });
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  },

  toggleChatInfo: () => set((state) => ({ chatInfoOpen: !state.chatInfoOpen })),
}));
