'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { Message } from '@/feature/chat/types';
import { VideoStatusBadge } from './VideoStatusBadge';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { FeedbackReviewActions } from '../FeedbackReviewActions';
import Image from 'next/image';

interface Props {
  message: Message;
}

export const FeedbackVideoMessage = ({ message }: Props) => {
  const isAdmin = useChatStore((s) => s.isAdmin);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);
  const socket = useSocketStore((s) => s.socket);

  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    'approved' | 'rejected' | null
  >(null);

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message.videoStatus !== 'under_review') {
      setIsReviewLoading(false);
      setLoadingAction(null);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [message.videoStatus]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  const handleReview = (status: 'approved' | 'rejected') => {
    if (
      isReviewLoading ||
      !socket ||
      !selectedChannelId ||
      !message.campaignVideoId
    ) {
      return;
    }

    setIsReviewLoading(true);
    setLoadingAction(status);

    socket.emit('feedback:review', {
      channelId: selectedChannelId,
      campaignVideoId: message.campaignVideoId,
      status,
    });

    timeoutRef.current = setTimeout(() => {
      setIsReviewLoading(false);
      setLoadingAction(null);
    }, 10000);
  };

  const isSubmitting =
    message.messageType === 'feedback_video' &&
    (message.status === 'sending' || message.status === 'sent') &&
    !message.campaignVideoId;

  const handleOpenVideo = () => {
    if (isSubmitting || !message.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <div className="flex bg-[#FFFFFF36] px-[18px] py-[14px] rounded-[8px] w-full max-w-[529px] overflow-hidden">
        <div className="relative w-full max-w-[112px] h-[126px]">
          <button
            type="button"
            onClick={handleOpenVideo}
            disabled={isSubmitting || !message.videoUrl}
            className="relative rounded-[8px] w-full max-w-[112px] h-[126px] overflow-hidden disabled:cursor-not-allowed"
          >
            <div className="top-1/2 left-1/2 absolute flex justify-center items-center bg-[#FFFFFF68] rounded-full w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2">
              <Image
                src={'/images/svg/playButton.svg'}
                alt="playButton"
                width={15}
                height={17}
              />
            </div>
            <video
              src={message.videoUrl ?? undefined}
              poster={message.videoCoverUrl ?? undefined}
              controls={false}
              className="bg-black rounded-[8px] w-full max-w-[112px] h-[126px] object-cover"
            />

            {isSubmitting && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-[8px]">
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              </div>
            )}
          </button>
        </div>

        <div className="flex flex-col justify-between gap-2 px-3 py-2 w-full min-h-full">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2 w-full min-w-0">
              <p className="w-full min-w-0 max-w-[200px] font-semibold text-[15px] text-white break-words line-clamp-2">
                {message.videoTitle || message.content}
              </p>
            </div>

            <div className="shrink-0">
              <VideoStatusBadge
                status={message.videoStatus}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {isAdmin &&
            message.videoStatus === 'under_review' &&
            !isSubmitting && (
              <FeedbackReviewActions
                isLoading={isReviewLoading}
                loadingAction={loadingAction}
                onReject={() => handleReview('rejected')}
                onApprove={() => handleReview('approved')}
              />
            )}
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-[#00000063] p-4"
          onClick={handleCloseVideo}
        >
          <button
            type="button"
            onClick={handleCloseVideo}
            className="top-[23px] right-[32px] z-10 absolute flex justify-center items-center bg-[#313A51C2] rounded-[16px] w-[65px] h-[65px] text-white cursor-pointer"
          >
            <X className="w-[35px] h-[35px]" />
          </button>
          <div
            className="bg-[url('/images/png/iPhoneFrame.png')] bg-cover bg-center px-[15px] py-[16px] rounded-[12px] w-full max-w-[442px] h-[910px] overflow-hidden relativ"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={message.videoUrl ?? undefined}
              poster={message.videoCoverUrl ?? undefined}
              controls
              autoPlay
              className="rounded-[60px] w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
