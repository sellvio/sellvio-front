'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '@/feature/chat/types';
import { VideoStatusBadge } from './VideoStatusBadge';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { FeedbackReviewActions } from '../FeedbackReviewActions';

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

  return (
    <div className="flex bg-[#FFFFFF36] px-[18px] py-[14px] rounded-[8px] w-full max-w-[529px] overflow-hidden">
      <div className="relative w-full max-w-[112px] h-[126px]">
        <video
          src={message.videoUrl ?? undefined}
          poster={message.videoCoverUrl ?? undefined}
          controls={!isSubmitting}
          className="bg-black rounded-[8px] w-full max-w-[112px] h-[126px] object-cover aspect-video"
        />

        {isSubmitting && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-[8px]">
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          </div>
        )}
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
        {isAdmin && message.videoStatus === 'under_review' && !isSubmitting && (
          <FeedbackReviewActions
            isLoading={isReviewLoading}
            loadingAction={loadingAction}
            onReject={() => handleReview('rejected')}
            onApprove={() => handleReview('approved')}
          />
        )}
      </div>
    </div>
  );
};
