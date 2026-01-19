'use client';
import { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import { channelsData, newChannelsData } from '../../data/chatData';
import Member from './Member';
import PinedMessage from './PinedMessage';
import Clarification from './Clarification';
import { GeneralChatProps } from '../../types';
import { useChatStore } from '@/feature/common/stores/useChatStore';

const GeneralChat = ({ chatFull }: GeneralChatProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { isAdmin, fetchMembers } = useChatStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

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
          <Image
            src={generalChannel.image}
            alt={generalChannel.title}
            width={20}
            height={20}
          />
          <span className="font-[600] text-[16px] text-white">
            {generalChannel.title}
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
      <div className="flex justify-end w-full h-full overflow-hidden">
        {activeTab && tabContent[activeTab]}
      </div>
      <div className="flex items-center gap-2 mt-2 mb-4 px-[7px] min-h-[56px]">
        <div className="relative flex items-center w-full">
          <Image
            src="/images/chatIcons/svg/plus.svg"
            width={24}
            height={24}
            alt="plus"
            className="left-2 absolute"
          />
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-[#FFFFFF36] py-[10px] pl-[36px] rounded-[10px] focus:outline-none w-full h-[56px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralChat;
