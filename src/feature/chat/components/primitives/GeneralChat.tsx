'use client';
import { useState, useEffect, JSX, useRef } from 'react';
import Image from 'next/image';
import { channelsData, newChannelsData } from '../../data/chatData';
import Member from './Member';
import PinedMessage from './PinedMessage';
import Clarification from './Clarification';
import { GeneralChatProps } from '../../types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';

const GeneralChat = ({ chatFull }: GeneralChatProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const isAutoScrolling = useRef<boolean>(true);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    if (scrollRef.current && isAutoScrolling.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoadingMessages && isLoadingChannel) {
      setChannelLoaded();
    }
  }, [isLoadingMessages, isLoadingChannel, setChannelLoaded]);

  useEffect(() => {
    if (!loadMoreTriggerRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasMore &&
          !isLoadingMessages &&
          !isLoadingChannel
        ) {
          setIsLoadingMore(true);
          prevScrollHeight.current = scrollRef.current?.scrollHeight || 0;

          if (selectedChannelId) {
            loadMoreMessages(selectedChannelId);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => observer.disconnect();
  }, [
    hasMore,
    isLoadingMessages,
    selectedChannelId,
    loadMoreMessages,
    isLoadingChannel,
  ]);

  useEffect(() => {
    if (scrollRef.current && isLoadingMore && !isLoadingMessages) {
      const currentScrollHeight = scrollRef.current.scrollHeight;
      const scrollDiff = currentScrollHeight - prevScrollHeight.current;
      scrollRef.current.scrollTop += scrollDiff;
      setIsLoadingMore(false);
    }
  }, [isLoadingMessages, isLoadingMore]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    isAutoScrolling.current = isNearBottom;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim() && selectedChannelId) {
      sendMessage(selectedChannelId, text.trim());
      setText('');
      isAutoScrolling.current = true;
    }
  };

  const generalChannel = channelsData[0].channels.find(
    (ch) => ch.id === 'general-chat'
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

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

  const visibleChannels = newChannelsData.filter(
    (item) => !item.isAdmin || isAdmin
  );

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return (
          <div className="border-2 border-white/30 border-t-white rounded-full w-3 h-3 animate-spin" />
        );
      case 'sent':
        return (
          <svg
            className="w-4 h-4 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case 'delivered':
        return (
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13l4 4L23 7"
            />
          </svg>
        );
      case 'failed':
        return (
          <svg
            className="w-4 h-4 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col bg-[#001541D6] w-full ${
        chatFull ? '' : 'max-w-[1440px]'
      } h-screen`}
    >
      <div className="flex justify-between items-center px-[26px] border-[#E0E0E0] border-b min-h-[49px]">
        <div className="flex items-center gap-2">
          {generalChannel && (
            <Image
              src={generalChannel.image}
              alt={generalChannel.title}
              width={20}
              height={20}
            />
          )}
          <span className="font-[600] text-[16px] text-white">
            {generalChannel?.title || 'Chat'}
          </span>
        </div>
        <div className="flex justify-between items-center w-full max-w-[162px]">
          {visibleChannels.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`cursor-pointer transition-opacity w-[40px] h-[40px] flex items-center justify-center ${
                activeTab === item.id
                  ? 'opacity-100 bg-[#FFFFFF36] rounded-[10px]'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              <Image src={item.image} alt={item.title} width={24} height={24} />
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 p-4 overflow-y-auto custom-scrollbar"
        >
          {!selectedChannelId ? (
            <div className="flex justify-center items-center h-full text-white/50">
              აირჩიეთ არხი
            </div>
          ) : isLoadingChannel ? (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="border-4 border-white/20 border-t-white rounded-full w-8 h-8 animate-spin" />
                <span className="text-white/50 text-sm">იტვირთება...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Load more trigger */}
              <div ref={loadMoreTriggerRef} className="h-4">
                {isLoadingMore && hasMore && (
                  <div className="flex justify-center py-2">
                    <div className="border-2 border-white/20 border-t-white rounded-full w-6 h-6 animate-spin" />
                  </div>
                )}
              </div>

              {messages.map((msg, index) => (
                <div key={msg.tempId || msg.id} className="mb-4 text-white">
                  <div className="flex items-baseline gap-2">
                    <span className="opacity-70 font-bold text-xs">
                      User {msg.senderId}
                    </span>
                    <span className="opacity-40 text-[10px]">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mt-1">
                    <div className="inline-block bg-[#FFFFFF36] p-2 rounded-lg text-[15px]">
                      {msg.content}
                    </div>
                    {getStatusIcon(msg.status)}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {activeTab && (
          <div className="right-0 z-10 bg-[#001541] border-white/10 border-l w-80 h-full">
            {tabContent[activeTab]}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2 mb-4 px-[7px] min-h-[56px]">
        <div className="relative flex items-center w-full">
          <Image
            src="/images/chatIcons/svg/plus.svg"
            width={24}
            height={24}
            alt="plus"
            className="left-2 absolute opacity-70"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!selectedChannelId || isLoadingChannel}
            placeholder={
              selectedChannelId ? 'Type a message...' : 'Select a channel first'
            }
            className="bg-[#FFFFFF36] disabled:opacity-50 py-[10px] pl-[36px] rounded-[10px] focus:outline-none w-full h-[56px] text-white placeholder:text-white/50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralChat;
