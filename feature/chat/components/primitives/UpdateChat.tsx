'use client';

import { useState } from 'react';
import ChatHeader from '../../../components/composites/ChatHeader';
import ChanellUpdateSidebar from './ChanellUpdateSidebar';
import UpdateChanel from './UpdateChanel';
import InviteMember from './InviteMember';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';

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
      className={`flex flex-col m-auto w-full ${chatFull ? '' : 'max-w-[1440px]'}  min-h-screen`}
    >
      <ChatHeader />

      <div className="flex rounded-[10px] overflow-hidden">
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
