import { memo } from 'react';
import { Message } from '@/feature/chat/types';
import { VideoStatusBadge } from './VideoStatusBadge';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';

interface Props {
  message: Message;
}

export const FeedbackVideoMessage = memo(({ message }: Props) => {
  const isAdmin = useChatStore((s) => s.isAdmin);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);
  const socket = useSocketStore((s) => s.socket);

  const handleReview = (status: 'approved' | 'rejected') => {
    if (!socket || !selectedChannelId || !message.campaignVideoId) return;
    socket.emit('feedback:review', {
      channelId: selectedChannelId,
      campaignVideoId: message.campaignVideoId,
      status,
    });
  };

  return (
    <div className="flex bg-[#FFFFFF36] px-[18px] py-[14px] rounded-[8px] w-full max-w-[529px] overflow-hidden">
      <video
        src={message.videoUrl ?? undefined}
        poster={message.videoCoverUrl ?? undefined}
        controls
        className="bg-black rounded-[8px] w-full max-w-[112px] h-[126px] object-cover aspect-video"
      />
      <div className="flex flex-col justify-between gap-2 px-3 py-2 w-full min-h-full">
        <div className="flex justify-between items-center gap-2 w-full">
          <p className="font-semibold text-[15px] text-white">
            {message.videoTitle || message.content}
          </p>
          <VideoStatusBadge status={message.videoStatus} />
        </div>

        {isAdmin && message.videoStatus === 'under_review' && (
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => handleReview('rejected')}
              className="flex-1 hover:bg-[#ff00004a] py-[10px] border border-[#0866FF] rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer"
            >
              უარყოფა
            </button>
            <button
              onClick={() => handleReview('approved')}
              className="flex-1 bg-[#0866FF] hover:bg-[#0867ffc1] py-[10px] rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer"
            >
              დადასტურება
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

FeedbackVideoMessage.displayName = 'FeedbackVideoMessage';
