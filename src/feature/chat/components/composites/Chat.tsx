'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ChanelInfo from '../primitives/ChanelInfo';
import Channels from '../primitives/Channels';
import ChanelInfoSidebar from '../primitives/ChanelInfoSidebar';
import CreateChanelPopup from '../primitives/CreateChanelPopup';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import ChatHeader from './ChatHeader';
import GeneralChat from '../primitives/GeneralChat';
import VerificationChat from '../primitives/VerificationChat';

const Chat = () => {
  const [chatInfoOpen, setChatInfoOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const { chatFull, toggleChatFull } = useChatLayout();
  const campaignId = Number(useSearchParams().get('campaignId')) || null;

  const selectedChannelTypeId = useChatStore(
    (state) => state.selectedChannelTypeId
  );

  // გვერდიდან გასვლისას ვხურავთ არხს და ვასუფთავებთ ჩატის მდგომარეობას,
  // რომ დაბრუნებისას ძველი არხი/შეტყობინებები არ დარჩეს
  useEffect(() => {
    return () => {
      const { serverId, selectedChannelId, resetChat } =
        useChatStore.getState();
      const { socket, closeChannel, clearMessages } = useSocketStore.getState();

      if (serverId && selectedChannelId) closeChannel(serverId, selectedChannelId);
      if (serverId) socket?.emit('server:close', { serverId });

      clearMessages();
      resetChat();
    };
  }, [campaignId]);

  if (!campaignId) {
    return (
      <div className="flex flex-col m-auto w-full max-w-[1440px] min-h-screen">
        <ChatHeader />
        <div className="flex flex-col flex-1 justify-center items-center gap-4 text-white">
          <p className="font-semibold text-[18px]">კამპანია არ არის მითითებული</p>
          <p className="text-white/70 text-[14px]">
            ჩატის გასახსნელად აირჩიე კამპანია
          </p>
          <Link
            href="/"
            className="bg-[#0866FF] hover:bg-[#0052D1] px-6 py-2 rounded-[8px] font-semibold text-[14px] transition-colors"
          >
            მთავარ გვერდზე დაბრუნება
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col m-auto w-full ${
        chatFull ? '' : 'max-w-[1440px]'
      } min-h-screen`}
    >
      {!chatFull && <ChatHeader />}

      <div
        className={`flex overflow-hidden ${chatFull ? '' : 'rounded-[10px]'}`}
      >
        {chatInfoOpen ? (
          <ChanelInfoSidebar
            toggleChatFull={toggleChatFull}
            chatFull={chatFull}
          />
        ) : (
          <Channels
            campaignId={campaignId}
            setChatInfoOpen={setChatInfoOpen}
            setIsOpen={setIsOpen}
            toggleChatFull={toggleChatFull}
            chatFull={chatFull}
          />
        )}

        {isOpen && <CreateChanelPopup setIsOpen={setIsOpen} />}

        {chatInfoOpen ? (
          <ChanelInfo setChatInfoOpen={setChatInfoOpen} chatFull={chatFull} />
        ) : selectedChannelTypeId === 4 ? (
          <VerificationChat chatFull={chatFull} />
        ) : (
          <GeneralChat chatFull={chatFull} />
        )}
      </div>
    </div>
  );
};

export default Chat;
