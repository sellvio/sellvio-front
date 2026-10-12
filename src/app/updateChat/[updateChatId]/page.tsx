'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import UpdateChat from '@/feature/chat/components/primitives/UpdateChat';

const ChangeChatInfo = () => {
  const params = useParams();
  const updateChatId = Number(params.updateChatId);

  if (!updateChatId) {
    return (
      <div className="flex justify-center items-center bg-[linear-gradient(90deg,rgba(48,18,179,0.3)_0%,rgba(123,98,232,0.3)_100%)] min-h-screen text-white">
        არხი ვერ მოიძებნა
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(90deg,rgba(48,18,179,0.3)_0%,rgba(123,98,232,0.3)_100%)]">
      <Suspense>
        <UpdateChat updateChatId={updateChatId} />
      </Suspense>
    </div>
  );
};

export default ChangeChatInfo;
