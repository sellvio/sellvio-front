'use client';

import { useState } from 'react';
import ChanellUpdateSidebar from './ChanellUpdateSidebar';
import UpdateChanel from './UpdateChanel';
import InviteMember from './InviteMember';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import ChatHeader from '../composites/ChatHeader';

type UpdateChatProps = {
  updateChatId: number;
};

const UpdateChat = ({ updateChatId }: UpdateChatProps) => {
  const { chatFull, toggleChatFull } = useChatLayout();
  const [chatChanel, setChatChanel] = useState<'chatInfo' | 'invitePeople'>(
    'chatInfo'
  );
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
        <ChanellUpdateSidebar
          chatFull={chatFull}
          toggleChatFull={toggleChatFull}
          setChatChanel={setChatChanel}
          chatChanel={chatChanel}
          channelId={updateChatId}
        />
        {chatChanel === 'chatInfo' ? (
          <UpdateChanel channelId={updateChatId} />
        ) : (
          <InviteMember />
        )}
      </div>
    </div>
  );
};

export default UpdateChat;
