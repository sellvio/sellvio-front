export type FooterOption = {
  id: number;
  label: string;
  href: string;
};

export type FooterItem = {
  id: number;
  title: string;
  options: FooterOption[];
};
export type Member = {
  id: number;
  name: string;
  role: 'admin' | 'user';
};

export type ChatStore = {
  members: Member[];
  isAdmin: boolean;
  chatInfoOpen: boolean;
  fetchMembers: () => Promise<void>;
  toggleChatInfo: () => void;
};
