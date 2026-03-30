'use client';

import { useState, useEffect, JSX, memo } from 'react';
import { channelsData, newChannelsData } from '../../data/chatData';
import Member from './Member';
import PinedMessage from './PinedMessage';
import { GeneralChatProps, Message } from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FeedbackChat from './FeedbackChat';
import { useAutoScroll } from '@/feature/chat/hooks/useAutoScroll';
import { useInfiniteScroll } from '@/feature/chat/hooks/useInfiniteScroll';
import Image from 'next/image';

const TAB_CONTENT: Record<string, JSX.Element> = {
  profile: <Member />,
  'frame-128760': <PinedMessage />,
  notification: (
    <div className="flex justify-center items-center h-full text-white">
      <h2 className="mb-2 font-semibold text-xl">Notifications</h2>
    </div>
  ),
};

const GeneralChat = memo(({ chatFull }: GeneralChatProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [replyMessage, setReplyMessage] = useState<Message | null>(null);

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

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: Message }>;
      if (customEvent.detail?.message) {
        setReplyMessage(customEvent.detail.message);
      }
    };

    window.addEventListener('chat:set-reply-message', handler);

    return () => {
      window.removeEventListener('chat:set-reply-message', handler);
    };
  }, []);

  const handleSendMessage = () => {
    if (!text.trim() || !selectedChannelId) return;

    sendMessage(selectedChannelId, text.trim(), replyMessage?.id ?? null);
    setText('');
    setReplyMessage(null);
    scrollToBottom();
  };

  const generalChannel = channelsData[0]?.channels.find(
    (ch) => ch.id === 'general-chat'
  );
  const visibleChannels = newChannelsData.filter(
    (item) => !item.isAdmin || isAdmin
  );

  const isFeedbackChannel = selectedChannelTypeId === 3;
  const isRulesChannel = selectedChannelTypeId === 2;
  const isRulesDisabled = isRulesChannel && !isAdmin;

  const inputPlaceholder = !selectedChannelId
    ? 'აირჩიე არხი'
    : isRulesDisabled
      ? 'ამ არხში მხოლოდ ადმინს შეუძლია შეტყობინების გაგზავნა'
      : replyMessage
        ? 'პასუხი...'
        : 'შეიყვანე შეტყობინება';

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

      {replyMessage && !isFeedbackChannel && (
        <div className="bg-[#FFFFFF46] mx-[7px] px-[20px] py-[16px] border-[#FFFFFF75] border-b rounded-t-[10px] text-white">
          <div className="flex justify-between items-start gap-3">
            <div className="flex items-center gap-[4px]">
              {/* <p className="mb-1 font-semibold text-[#9CC2FF] text-[12px]">
                პასუხობ
                {replyMessage.senderFirstName ??
                  `User ${replyMessage.senderId}`}
                -ს
              </p> */}
              <p className="text-[#FFFFFF80] text-[15px]">Replying to</p>
              <p className="font-bold text-[#FFFFFF80] text-[15px]">
                {replyMessage.content}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setReplyMessage(null)}
              className="flex justify-center items-center bg-[#22325E4D] border border-[#FFFFFFC7] rounded-full w-[24px] h-[24px] cursor-pointer shrink-0"
            >
              <Image
                src={'/images/messageIcons/svg/removeReply.svg'}
                alt="removeReply"
                width={9}
                height={9}
              />
            </button>
          </div>
        </div>
      )}

      {isFeedbackChannel ? (
        <FeedbackChat />
      ) : (
        <MessageInput
          text={text}
          setText={setText}
          onSend={handleSendMessage}
          disabled={!selectedChannelId || isLoadingChannel || isRulesDisabled}
          selectedChannelId={selectedChannelId}
          placeholder={inputPlaceholder}
          isReplying={!!replyMessage}
        />
      )}
    </div>
  );
});

GeneralChat.displayName = 'GeneralChat';
export default GeneralChat;
