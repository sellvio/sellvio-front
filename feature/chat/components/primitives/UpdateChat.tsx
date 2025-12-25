'use client';

import { useState } from 'react';
import ChatHeader from '../../../components/composites/ChatHeader';
import ChanellUpdateSidebar from './ChanellUpdateSidebar';
import UpdateChanel from './UpdateChanel';
import InviteMember from './InviteMember';

type UpdateChatProps = {
  updateChatId: number;
};

const UpdateChat = ({ updateChatId }: UpdateChatProps) => {
  const [chatChanel, setChatChanel] = useState<'chatInfo' | 'invitePeople'>(
    'chatInfo'
  );
  return (
    <div className="flex flex-col m-auto w-full max-w-[1440px] min-h-screen">
      <ChatHeader />

      <div className="flex rounded-[10px] overflow-hidden">
        <ChanellUpdateSidebar
          setChatChanel={setChatChanel}
          chatChanel={chatChanel}
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
