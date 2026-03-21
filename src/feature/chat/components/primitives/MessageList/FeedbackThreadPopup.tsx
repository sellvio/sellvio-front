'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Message } from '@/feature/chat/types';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { useChatStore } from '@/feature/common/stores/useChatStore';

interface FeedbackThreadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoMessage: Message;
}

const getSenderName = (msg: Message): string => {
  if (msg.senderFirstName && msg.senderLastName) {
    return `${msg.senderFirstName} ${msg.senderLastName}`;
  }

  if (msg.senderFirstName) return msg.senderFirstName;

  return `User ${msg.senderId}`;
};

const sortMessages = (messages: Message[]) => {
  return [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

const FeedbackThreadPopup = ({
  isOpen,
  onClose,
  videoMessage,
}: FeedbackThreadPopupProps) => {
  const socket = useSocketStore((s) => s.socket);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);

  const [threadMessages, setThreadMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const campaignVideoId = videoMessage.campaignVideoId;

  const popupTitle = useMemo(() => {
    return videoMessage.videoTitle || videoMessage.content || 'ვიდეოს განხილვა';
  }, [videoMessage]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !socket || !selectedChannelId || !campaignVideoId) return;

    setIsLoading(true);
    setText('');
    setThreadMessages([]);

    socket.emit('feedback:thread', {
      channelId: selectedChannelId,
      campaignVideoId,
      limit: 50,
    });

    const handleThread = (data: {
      channelId: number;
      campaignVideoId: number;
      messages: Message[];
    }) => {
      if (
        data.channelId !== selectedChannelId ||
        data.campaignVideoId !== campaignVideoId
      ) {
        return;
      }

      setThreadMessages(sortMessages(data.messages ?? []));
      setIsLoading(false);
    };

    const handleFeedbackMessage = (incomingMessage: Message) => {
      if (
        incomingMessage.channelId !== selectedChannelId ||
        incomingMessage.campaignVideoId !== campaignVideoId
      ) {
        return;
      }

      setThreadMessages((prev) => {
        const exists = prev.some((item) => item.id === incomingMessage.id);
        if (exists) return prev;

        return sortMessages([...prev, incomingMessage]);
      });

      setIsSending(false);
    };

    socket.on('feedback:thread', handleThread);
    socket.on('feedback:message', handleFeedbackMessage);

    return () => {
      socket.off('feedback:thread', handleThread);
      socket.off('feedback:message', handleFeedbackMessage);
    };
  }, [isOpen, socket, selectedChannelId, campaignVideoId]);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 80);

    return () => clearTimeout(timeout);
  }, [threadMessages, isOpen]);

  const handleSend = () => {
    const trimmed = text.trim();

    if (
      !socket ||
      !selectedChannelId ||
      !campaignVideoId ||
      !trimmed ||
      isSending
    ) {
      return;
    }

    setIsSending(true);

    socket.emit('feedback:reply', {
      channelId: selectedChannelId,
      campaignVideoId,
      content: trimmed,
    });

    setText('');
  };

  if (!isOpen) return null;

  return (
    <div className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative flex flex-col bg-[#24376D] shadow-[0_0_0_2px_#ffffff14] rounded-[16px] w-full max-w-[380px] h-[520px] overflow-hidden">
        <div className="flex justify-between items-center px-5 pt-4 pb-3">
          <div className="pr-3 min-w-0">
            <p className="font-semibold text-[15px] text-white truncate">
              {popupTitle}
            </p>
            <p className="mt-1 text-white/55 text-xs">Feedback thread</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex justify-center items-center bg-white/10 hover:bg-white/20 rounded-[8px] w-[32px] h-[32px] transition cursor-pointer shrink-0"
          >
            <span className="text-white text-lg leading-none">✕</span>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 px-4 pb-4 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-white/60 text-sm">
              იტვირთება...
            </div>
          ) : threadMessages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-white/60 text-sm text-center">
              ამ ვიდეოზე ჯერ შეტყობინებები არ არის
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {threadMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="bg-[#E6E6E6] rounded-full w-8 h-8 shrink-0" />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <span className="font-semibold text-white">
                        {getSenderName(msg)}
                      </span>
                      <span>
                        დღეს{' '}
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="bg-[#6B79A61A] mt-2 px-4 py-3 rounded-[10px] max-w-[280px] text-white text-sm break-words">
                      {msg.replyTo && (
                        <div className="bg-white/10 mb-2 px-3 py-2 border-[#8BB8FF] border-l-2 rounded-md">
                          <p className="font-semibold text-[#8BB8FF] text-[11px]">
                            {msg.replyTo.senderFirstName ??
                              `User ${msg.replyTo.senderId}`}
                          </p>
                          <p className="text-[11px] text-white/70 line-clamp-2">
                            {msg.replyTo.content}
                          </p>
                        </div>
                      )}

                      <p>{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-3 pb-3">
          <div className="flex items-center gap-3 bg-[#6373A4] px-4 rounded-[12px] h-[52px]">
            <button
              type="button"
              className="text-[28px] text-white leading-none cursor-pointer shrink-0"
            >
              +
            </button>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Write a message..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/55 text-sm"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || isSending}
              className="flex justify-center items-center disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Image
                src="/images/chatIcons/svg/smile.svg"
                alt="send"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackThreadPopup;
