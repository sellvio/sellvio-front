'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { Message } from '@/feature/chat/types';

const getSenderName = (message: Message) => {
  if (message.senderFirstName && message.senderLastName) {
    return `${message.senderFirstName} ${message.senderLastName}`;
  }

  if (message.senderFirstName) {
    return message.senderFirstName;
  }

  return `User ${message.senderId}`;
};

const formatMessageTime = (createdAt: string) => {
  return new Date(createdAt).toLocaleString();
};

const PinedMessage = () => {
  const messages = useSocketStore((state) => state.messages);
  const pinMessage = useSocketStore((state) => state.pinMessage);
  const pendingPinMessageIds = useSocketStore(
    (state) => state.pendingPinMessageIds
  );
  const selectedChannelId = useChatStore((state) => state.selectedChannelId);
  const isAdmin = useChatStore((state) => state.isAdmin);

  const pinnedMessages = useMemo(
    () =>
      messages
        .filter((message) => message.pinned)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [messages]
  );

  const handleUnpin = (messageId: number) => {
    if (!selectedChannelId) return;
    pinMessage(selectedChannelId, messageId, false);
  };

  return (
    <div className="[border-bottom-left-radius:10px] [border-top-left-radius:10px] flex flex-col gap-[14px] bg-[linear-gradient(0deg,rgba(17,24,39,0.42),rgba(17,24,39,0.42)),linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1))] px-[7px] py-[11px] w-full max-w-[304px] h-full overflow-y-auto">
      {pinnedMessages.length === 0 ? (
        <div className="flex justify-center items-center px-4 h-full text-white/60 text-sm text-center">
          აპინული მესიჯები ჯერ არ არის
        </div>
      ) : (
        pinnedMessages.map((message) => {
          const isPinLoading = pendingPinMessageIds.includes(message.id);

          return (
            <div
              key={message.id}
              className="flex items-center bg-[#FFFFFF1A] px-[22px] py-[11px] rounded-[8px] duration-300 ease-in-out"
            >
              <div className="flex flex-col justify-center gap-[15px] w-full">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex gap-[7px] min-w-0">
                    <div className="relative bg-[#999999] rounded-full w-[31px] h-[31px] overflow-hidden shrink-0">
                      {message.senderImageUrl ? (
                        <Image
                          src={message.senderImageUrl}
                          alt={getSenderName(message)}
                          fill
                          className="object-cover"
                        />
                      ) : null}

                      <Image
                        src={'/images/chatIcons/svg/activeStatusIcon.svg'}
                        alt="userStatus"
                        width={8}
                        height={8}
                        className="right-[1px] bottom-[1px] absolute"
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex flex-wrap items-center gap-[4px]">
                        <p className="font-semibold text-[#FFFFFF] text-[15px] break-words">
                          {getSenderName(message)}
                        </p>
                        <p className="font-[400] text-[#FFFFFFAD] text-[13px] break-words">
                          {formatMessageTime(message.createdAt)}
                        </p>
                      </div>

                      <p className="font-[400] text-[#FFFFFFAD] text-[15px] break-words">
                        {message.content ||
                          message.videoTitle ||
                          'Pinned message'}
                      </p>
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      type="button"
                      disabled={isPinLoading}
                      onClick={() => handleUnpin(message.id)}
                      className="flex items-center gap-1 hover:bg-white/10 disabled:opacity-60 px-2 py-1 border border-white/10 rounded-[8px] text-white text-xs transition cursor-pointer disabled:cursor-not-allowed shrink-0"
                    >
                      {isPinLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Loading
                        </>
                      ) : (
                        'Unpin'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PinedMessage;
