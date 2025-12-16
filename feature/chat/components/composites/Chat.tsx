'use client';
import { useState } from 'react';
import ChatHeader from '../../../components/composites/ChatHeader';
import ChanelInfo from '../primitives/ChanelInfo';
import Channels from '../primitives/Channels';
import GeneralChat from '../primitives/GeneralChat';

const Chat = () => {
  const [chatInfoOpen, setChatInfoOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col m-auto w-full max-w-[1440px] min-h-screen">
      <ChatHeader />
      <div className="flex rounded-[10px] overflow-hidden">
        <Channels setChatInfoOpen={setChatInfoOpen} />
        {chatInfoOpen ? <ChanelInfo /> : <GeneralChat />}
      </div>
    </div>
  );
};

export default Chat;
