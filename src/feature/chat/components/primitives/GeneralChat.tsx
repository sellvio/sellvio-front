'use client';

import { useState, useEffect, JSX } from 'react';
import { channelsData, newChannelsData } from '../../data/chatData';
import Member from './Member';
import PinedMessage from './PinedMessage';
import Clarification from './Clarification';
import { GeneralChatProps } from '../../types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { UseAutoScroll } from './UseAutoScroll';
import { UseInfiniteScroll } from './UseInfiniteScroll';

const GeneralChat = ({ chatFull }: GeneralChatProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [text, setText] = useState('');

  const {
    isAdmin,
    fetchMembers,
    selectedChannelId,
    isLoadingChannel,
    setChannelLoaded,
  } = useChatStore();

  const {
    messages,
    sendMessage,
    isLoadingMessages,
    hasMore,
    loadMoreMessages,
  } = useSocketStore();

  const { scrollRef, handleScroll, scrollToBottom } = UseAutoScroll(
    messages,
    isLoadingChannel
  );

  const { loadMoreTriggerRef, isLoadingMore } = UseInfiniteScroll({
    hasMore,
    isLoadingMessages,
    isLoadingChannel,
    selectedChannelId,
    loadMoreMessages,
    scrollRef,
  });

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    if (!isLoadingMessages && isLoadingChannel) {
      setChannelLoaded();
    }
  }, [isLoadingMessages, isLoadingChannel, setChannelLoaded]);

  const handleSendMessage = () => {
    if (!text.trim() || !selectedChannelId) return;

    sendMessage(selectedChannelId, text.trim());
    setText('');
    scrollToBottom();
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const generalChannel = channelsData[0]?.channels.find(
    (ch) => ch.id === 'general-chat'
  );

  const visibleChannels = newChannelsData.filter(
    (item) => !item.isAdmin || isAdmin
  );

  const tabContent: Record<string, JSX.Element> = {
    profile: <Member />,
    'frame-128760': <PinedMessage />,
    'component-2': <Clarification />,
    notification: (
      <div className="flex justify-center items-center h-full text-white">
        <h2 className="mb-2 font-semibold text-xl">Notifications</h2>
      </div>
    ),
  };

  return (
    <div
      className={`flex flex-col bg-[#001541D6] w-full ${
        chatFull ? '' : 'max-w-[1440px]'
      } h-screen`}
    >
      <ChatHeader
        channelTitle={generalChannel?.title || 'Chat'}
        channelImage={generalChannel?.image || ''}
        visibleChannels={visibleChannels}
        activeTab={activeTab}
        onTabClick={handleTabClick}
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

        {activeTab && (
          <div className="right-0 z-10 bg-[#001541] border-white/10 border-l w-80 h-full">
            {tabContent[activeTab]}
          </div>
        )}
      </div>

      <MessageInput
        text={text}
        setText={setText}
        onSend={handleSendMessage}
        disabled={!selectedChannelId || isLoadingChannel}
        selectedChannelId={selectedChannelId}
      />
    </div>
  );
};

export default GeneralChat;
