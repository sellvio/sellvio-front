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
    <div className="bg-[#FFFFFF14] border border-white/10 rounded-xl w-full max-w-[300px] overflow-hidden">
      <video
        src={message.videoUrl ?? undefined}
        poster={message.videoCoverUrl ?? undefined}
        controls
        className="bg-black w-full object-cover aspect-video"
      />
      <div className="flex flex-col gap-2 px-3 py-2">
        <div className="flex justify-between items-center gap-2">
          <p className="font-medium text-white text-sm truncate">
            {message.videoTitle || message.content}
          </p>
          <VideoStatusBadge status={message.videoStatus} />
        </div>

        {isAdmin && message.videoStatus === 'under_review' && (
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => handleReview('approved')}
              className="flex-1 bg-green-600/80 hover:bg-green-600 py-1.5 rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer"
            >
              დადასტურება
            </button>
            <button
              onClick={() => handleReview('rejected')}
              className="flex-1 bg-red-600/80 hover:bg-red-600 py-1.5 rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer"
            >
              უარყოფა
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

FeedbackVideoMessage.displayName = 'FeedbackVideoMessage';
