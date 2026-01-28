'use client';

import { useState } from 'react';
import ChanelInfo from '../primitives/ChanelInfo';
import Channels from '../primitives/Channels';
import GeneralChat from '../primitives/GeneralChat';
import ChanelInfoSidebar from '../primitives/ChanelInfoSidebar';
import CreateChanelPopup from '../primitives/CreateChanelPopup';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import ChatHeader from '../../../../../feature/components/composites/ChatHeader';

const Chat = () => {
  const [chatInfoOpen, setChatInfoOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const { chatFull, toggleChatFull } = useChatLayout();

  return (
    <div
      className={`flex flex-col m-auto w-full ${
        chatFull ? 'p-[10px]' : 'max-w-[1440px]'
      } min-h-screen`}
    >
      {!chatFull && <ChatHeader />}

      <div className="flex rounded-[10px] overflow-hidden">
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
        ) : (
          <GeneralChat chatFull={chatFull} />
        )}
      </div>
    </div>
  );
};

export default Chat;
