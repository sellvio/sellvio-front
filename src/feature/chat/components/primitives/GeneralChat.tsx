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

  const { isAdmin, fetchMembers, selectedChannelId } = useChatStore();
  const { messages, sendMessage } = useSocketStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim() && selectedChannelId) {
      sendMessage(selectedChannelId, text.trim());
      setText('');
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
          className="flex-1 p-4 overflow-y-auto custom-scrollbar"
        >
          {!selectedChannelId ? (
            <div className="flex justify-center items-center h-full text-white/50">
              აირჩიეთ არხი
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="mb-4 text-white">
                <div className="flex items-baseline gap-2">
                  <span className="opacity-70 font-bold text-xs">
                    User {msg.senderId}
                  </span>
                  <span className="opacity-40 text-[10px]">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="inline-block bg-[#FFFFFF36] mt-1 p-2 rounded-lg text-[15px]">
                  {msg.content}
                </div>
              </div>
            ))
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
            disabled={!selectedChannelId}
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
