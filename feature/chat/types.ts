export type ChannelsProps = {
  setChatInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChatFull: () => void;
  chatFull: boolean;
};

export type ChanelInfoSidebarProps = {
  toggleChatFull: () => void;
  chatFull: boolean;
};

export type ChanelInfoProps = {
  setChatInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatFull: boolean;
};

export type User = {
  user: {
    id: string;
    email: string;
  };
};
export type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredUsers: User[];
  selectedUsers: User[];
  selectedIds: string[];
  toggleUser: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
};

export type ChanellUpdateSidebarProps = {
  chatChanel: 'chatInfo' | 'invitePeople';
  setChatChanel: React.Dispatch<
    React.SetStateAction<'chatInfo' | 'invitePeople'>
  >;
  channelId: number;
  chatFull: boolean;
  toggleChatFull: () => void;
};
export type ChatChannel = {
  id: number;
  name: string;
};
export type CreateChanelPopupProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type DeleteChatPopupProps = {
  handleDeleteChannel: () => Promise<void> | void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type GeneralChatProps = {
  chatFull?: boolean;
};
