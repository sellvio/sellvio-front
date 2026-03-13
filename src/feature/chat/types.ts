import { RefObject } from 'react';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed';
export type VideoStatus = 'under_review' | 'approved' | 'rejected';
export type ChannelState = 'public' | 'private';
export type MemberRole = 'admin' | 'user';
export type ChatChannelType = 'chatInfo' | 'invitePeople';

export interface Member {
  id: number;
  name: string;
  role: MemberRole;
}

export interface ChatChannel {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  channel_type_id?: number;
}

export interface ReactionUser {
  id: number;
  firstName: string | null;
}

export interface MessageReaction {
  emojiId: number;
  emoji: string;
  emojiUrl: string;
  users: ReactionUser[];
}

export interface ReplyTo {
  id: number;
  content: string;
  senderId: number;
  senderFirstName: string | null;
}

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
  videoStatus?: VideoStatus;
  campaignVideoId?: number | null;
  images?: string[];
  reactions?: MessageReaction[];
  replyToId?: number | null;
  replyTo?: ReplyTo | null;
}

export interface PendingReactionOperation {
  operationId: string;
  channelId: number;
  messageId: number;
  emojiId: number;
  userId: number;
  action: 'add' | 'remove';
}

export interface ChatStore {
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
}

export interface SocketState {
  socket: ReturnType<typeof import('socket.io-client').io> | null;
  isConnected: boolean;
  messages: Message[];
  isLoadingMessages: boolean;
  hasMore: boolean;
  currentPage: number;
  pendingReactionOperations: PendingReactionOperation[];
  connect: (token: string) => void;
  disconnect: () => void;
  joinServer: (serverId: number) => void;
  joinChannel: (
    serverId: number,
    channelId: number,
    channelTypeId?: number
  ) => void;
  sendMessage: (channelId: number, content: string) => void;
  loadMoreMessages: (channelId: number) => void;
  clearMessages: () => void;
  submitFeedback: (channelId: number, title: string, videoUrl: string) => void;
  addReaction: (channelId: number, messageId: number, emojiId: number) => void;
  removeReaction: (
    channelId: number,
    messageId: number,
    emojiId: number
  ) => void;
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
  loadMoreTriggerRef: RefObject<HTMLDivElement | null>;
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
  scrollRef: RefObject<HTMLDivElement | null>;
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

export type InvitePeopleProps = {
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
  chatChanel: ChatChannelType;
  setChatChanel: React.Dispatch<React.SetStateAction<ChatChannelType>>;
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
