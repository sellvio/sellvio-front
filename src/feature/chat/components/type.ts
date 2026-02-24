import { Socket } from 'socket.io-client';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed';

export type Message = {
  id: number;
  channelId: number;
  senderId: number;
  content: string;
  createdAt: string;
  pinned: boolean;
  status?: MessageStatus;
  tempId?: string;
};

export type SocketState = {
  socket: Socket | null;
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
  selectedChannelId: number | null;
  isLoadingChannel: boolean;
  currentUser: Member | null;
  setSelectedChannelId: (id: number) => void;
  setChannelLoaded: () => void;
  fetchMembers: () => Promise<void>;
  toggleChatInfo: () => void;
  serverId: number | null;
  setServerId: (id: number) => void;
};

export type MessageListProps = {
  messages: Message[];
  isLoadingChannel: boolean;
  selectedChannelId: number | null;
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMoreTriggerRef: React.RefObject<HTMLDivElement>;
};

export type MessageInputProps = {
  text: string;
  setText: (text: string) => void;
  onSend: () => void;
  disabled: boolean;
  selectedChannelId: number | null;
};

export type ChatHeaderProps = {
  channelTitle: string;
  channelImage: string;
  visibleChannels: Array<{ id: string; image: string; title: string }>;
  activeTab: string | null;
  onTabClick: (tabId: string) => void;
};

export type UseInfiniteScrollProps = {
  hasMore: boolean;
  isLoadingMessages: boolean;
  isLoadingChannel: boolean;
  selectedChannelId: number | null;
  loadMoreMessages: (channelId: number) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
};
