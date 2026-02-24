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

export type CreateChanelPopupProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type DeleteChatPopupProps = {
  handleDeleteChannel: () => Promise<void> | void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPending?: boolean;
};

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed';

export interface Message {
  id: number;
  channelId: number;
  senderId: number;
  content: string;
  createdAt: string;
  pinned: boolean;
  status?: MessageStatus;
  tempId?: string;

  senderFirstName?: string | null;
  senderLastName?: string | null;
  senderImageUrl?: string | null;
}

export interface Member {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

export interface ChatChannel {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface GeneralChatProps {
  chatFull: boolean;
}

export interface ChannelsProps {
  setChatInfoOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  setIsOpen?: (value: boolean) => void;
  toggleChatFull: () => void;
  chatFull: boolean;
}

export interface ChatStore {
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

export interface SocketState {
  socket: any | null;
  isConnected: boolean;
  messages: Message[];
  isLoadingMessages: boolean;
  hasMore: boolean;
  currentPage: number;

  connect: (token: string) => void;
  disconnect: () => void;
  joinServer: (serverId: number) => void;
  joinChannel: (serverId: number, channelId: number) => void;
  sendMessage: (channelId: number, content: string) => void;
  loadMoreMessages: (channelId: number) => void;
  clearMessages: () => void;
}

export interface ChatMemberResponse {
  data: Array<{
    user: {
      id: number;
      email: string;
    };
    role: 'admin' | 'user';
  }>;
}

export interface ChatChannelResponse {
  data: {
    name: string;
    chat_channels: ChatChannel[];
  };
}

export interface ServerOnlineData {
  onlineUsers: any[];
  offlineUsers: any[];
}

export interface MessageHistoryData {
  messages: Message[];
}

export interface MessageSentData {
  tempId?: string;
  message: Message;
}

export interface MessageDeliveredData {
  tempId: string;
  messageId: number;
}

export interface MessageErrorData {
  tempId?: string;
  error: string;
}
