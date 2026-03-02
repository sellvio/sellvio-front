'use client';

import { useState, useEffect, JSX, memo } from 'react';
import { channelsData, newChannelsData } from '../../data/chatData';
import Member from './Member';
import PinedMessage from './PinedMessage';
import Clarification from './Clarification';
import { GeneralChatProps } from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FeedbackChat from './FeedbackChat';
import { useAutoScroll } from '@/feature/chat/hooks/useAutoScroll';
import { useInfiniteScroll } from '@/feature/chat/hooks/useInfiniteScroll';

const TAB_CONTENT: Record<string, JSX.Element> = {
  profile: <Member />,
  'frame-128760': <PinedMessage />,
  'component-2': <Clarification />,
  notification: (
    <div className="flex justify-center items-center h-full text-white">
      <h2 className="mb-2 font-semibold text-xl">Notifications</h2>
    </div>
  ),
};

const GeneralChat = memo(({ chatFull }: GeneralChatProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [text, setText] = useState('');

  const isAdmin = useChatStore((s) => s.isAdmin);
  const fetchMembers = useChatStore((s) => s.fetchMembers);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);
  const selectedChannelTypeId = useChatStore((s) => s.selectedChannelTypeId);
  const isLoadingChannel = useChatStore((s) => s.isLoadingChannel);
  const setChannelLoaded = useChatStore((s) => s.setChannelLoaded);

  const messages = useSocketStore((s) => s.messages);
  const sendMessage = useSocketStore((s) => s.sendMessage);
  const isLoadingMessages = useSocketStore((s) => s.isLoadingMessages);
  const hasMore = useSocketStore((s) => s.hasMore);
  const loadMoreMessages = useSocketStore((s) => s.loadMoreMessages);

  const { scrollRef, handleScroll, scrollToBottom } = useAutoScroll(
    messages,
    isLoadingChannel
  );
  const { loadMoreTriggerRef, isLoadingMore } = useInfiniteScroll({
    hasMore,
    isLoadingMessages,
    isLoadingChannel,
    selectedChannelId,
    loadMoreMessages,
    scrollRef,
    messages,
  });

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    if (!isLoadingMessages && isLoadingChannel) setChannelLoaded();
  }, [isLoadingMessages, isLoadingChannel, setChannelLoaded]);

  const handleSendMessage = () => {
    if (!text.trim() || !selectedChannelId) return;
    sendMessage(selectedChannelId, text.trim());
    setText('');
    scrollToBottom();
  };

  const generalChannel = channelsData[0]?.channels.find(
    (ch) => ch.id === 'general-chat'
  );
  const visibleChannels = newChannelsData.filter(
    (item) => !item.isAdmin || isAdmin
  );
  const isFeedbackChannel = selectedChannelTypeId === 3;

  return (
    <div
      className={`flex flex-col bg-[#001541D6] w-full ${chatFull ? '' : 'max-w-[1440px]'} h-screen`}
    >
      <ChatHeader
        channelTitle={generalChannel?.title || 'Chat'}
        channelImage={generalChannel?.image || ''}
        visibleChannels={visibleChannels}
        activeTab={activeTab}
        onTabClick={(id) => setActiveTab(activeTab === id ? null : id)}
      />
      <div className="relative flex flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 p-4 overflow-y-auto custom-scrollbar"
        >
          <MessageList
            messages={messages}
            isLoadingChannel={isLoadingChannel}
            selectedChannelId={selectedChannelId}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            loadMoreTriggerRef={loadMoreTriggerRef}
          />
        </div>
        {activeTab && TAB_CONTENT[activeTab]}
      </div>
      {isFeedbackChannel ? (
        <FeedbackChat />
      ) : (
        <MessageInput
          text={text}
          setText={setText}
          onSend={handleSendMessage}
          disabled={!selectedChannelId || isLoadingChannel}
          selectedChannelId={selectedChannelId}
        />
      )}
    </div>
  );
});

GeneralChat.displayName = 'GeneralChat';
export default GeneralChat;
