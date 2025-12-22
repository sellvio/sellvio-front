'use client';

import { useParams } from 'next/navigation';
import UpdateChat from '../../../../feature/chat/components/primitives/UpdateChat';

const ChangeChatInfo = () => {
  const params = useParams();
  const updateChatId = Number(params.updateChatId);

  if (!updateChatId) {
    return <div>Loading...</div>;
  }

  return <UpdateChat updateChatId={updateChatId} />;
};

export default ChangeChatInfo;
