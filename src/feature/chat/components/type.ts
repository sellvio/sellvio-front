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
  messageType?: 'text' | 'feedback_video';
  videoUrl?: string | null;
  videoTitle?: string | null;
  videoCoverUrl?: string | null;
  videoStatus?: 'under_review' | 'approved' | 'rejected';
  campaignVideoId?: number | null;
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
  channel_type_id?: number;
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
  submitFeedback: (channelId: number, title: string, videoUrl: string) => void;
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

export interface MessageListProps {
  messages: Message[];
  isLoadingChannel: boolean;
  selectedChannelId: number | null;
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMoreTriggerRef: React.RefObject<HTMLDivElement>;
}

export interface MessageInputProps {
  text: string;
  setText: (text: string) => void;
  onSend: () => void;
  disabled: boolean;
  selectedChannelId: number | null;
}

export interface ChatHeaderProps {
  channelTitle: string;
  channelImage: string;
  visibleChannels: Array<{ id: string; image: string; title: string }>;
  activeTab: string | null;
  onTabClick: (tabId: string) => void;
}

export interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoadingMessages: boolean;
  isLoadingChannel: boolean;
  selectedChannelId: number | null;
  loadMoreMessages: (channelId: number) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  messages: Message[];
}

export type ChanelInfoSidebarProps = {
  toggleChatFull: () => void;
  chatFull: boolean;
};

export type ChanelInfoProps = {
  setChatInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatFull: boolean;
};

export type User = {
  user: { id: string; email: string };
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
