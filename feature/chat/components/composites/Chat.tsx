'use client';
import { useState } from 'react';
import ChatHeader from '../../../components/composites/ChatHeader';
import ChanelInfo from '../primitives/ChanelInfo';
import Channels from '../primitives/Channels';
import GeneralChat from '../primitives/GeneralChat';
import ChanelInfoSidebar from '../primitives/ChanelInfoSidebar';

const Chat = () => {
  const [chatInfoOpen, setChatInfoOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col m-auto w-full max-w-[1440px] min-h-screen">
      <ChatHeader />
      <div className="flex rounded-[10px] overflow-hidden">
        {chatInfoOpen ? (
          <ChanelInfoSidebar />
        ) : (
          <Channels setChatInfoOpen={setChatInfoOpen} />
        )}

        {chatInfoOpen ? (
          <ChanelInfo setChatInfoOpen={setChatInfoOpen} />
        ) : (
          <GeneralChat />
        )}
      </div>
    </div>
  );
};

export default Chat;
