'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChanellUpdateSidebar from './ChanellUpdateSidebar';
import UpdateChanel from './UpdateChanel';
import InviteMember from './InviteMember';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import { useChatServer } from '@/feature/chat/hooks/useChatServer';
import ChatHeader from '../composites/ChatHeader';

type UpdateChatProps = {
  updateChatId: number;
};

const UpdateChat = ({ updateChatId }: UpdateChatProps) => {
  const { chatFull, toggleChatFull } = useChatLayout();
  const [chatChanel, setChatChanel] = useState<'chatInfo' | 'invitePeople'>(
    'chatInfo'
  );

  // campaignId-ით ვტვირთავთ სერვერს, რომ გვერდის განახლებისას serverId არ დაიკარგოს
  const campaignId = Number(useSearchParams().get('campaignId')) || null;
  const { channels } = useChatServer(campaignId);
  const channel = channels.find((ch) => ch.id === updateChatId) ?? null;
  const backHref = campaignId ? `/chat?campaignId=${campaignId}` : '/chat';

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
          backHref={backHref}
        />
        {chatChanel === 'chatInfo' ? (
          <UpdateChanel
            channelId={updateChatId}
            channel={channel}
            backHref={backHref}
          />
        ) : (
          <InviteMember channelId={updateChatId} backHref={backHref} />
        )}
      </div>
    </div>
  );
};

export default UpdateChat;
