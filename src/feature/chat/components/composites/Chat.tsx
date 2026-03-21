'use client';

import { useState, useEffect } from 'react';
import ChanelInfo from '../primitives/ChanelInfo';
import Channels from '../primitives/Channels';
import ChanelInfoSidebar from '../primitives/ChanelInfoSidebar';
import CreateChanelPopup from '../primitives/CreateChanelPopup';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { ChatFromCampaing } from '../../api/chatApi';
import ChatHeader from './ChatHeader';
import GeneralChat from '../primitives/GeneralChat';
import VerificationChat from '../primitives/VerificationChat';

const Chat = () => {
  const [chatInfoOpen, setChatInfoOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const { chatFull, toggleChatFull } = useChatLayout();

  const setServerId = useChatStore((state) => state.setServerId);
  const selectedChannelTypeId = useChatStore(
    (state) => state.selectedChannelTypeId
  );

  useEffect(() => {
    const fetchChatServer = async () => {
      try {
        const response = await ChatFromCampaing(31);

        if (response.success && response.data.id) {
          setServerId(response.data.id);
        }
      } catch (error) {}
    };

    fetchChatServer();
  }, [setServerId]);

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
