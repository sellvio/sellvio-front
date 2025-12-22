'use client';

import ChatHeader from '../../../components/composites/ChatHeader';
import ChanellUpdateSidebar from './ChanellUpdateSidebar';
import UpdateChanel from './UpdateChanel';

type UpdateChatProps = {
  updateChatId: number;
};

const UpdateChat = ({ updateChatId }: UpdateChatProps) => {
  return (
    <div className="flex flex-col m-auto w-full max-w-[1440px] min-h-screen">
      <ChatHeader />

      <div className="flex rounded-[10px] overflow-hidden">
        <ChanellUpdateSidebar />
        <UpdateChanel channelId={updateChatId} />
      </div>
    </div>
  );
};

export default UpdateChat;
