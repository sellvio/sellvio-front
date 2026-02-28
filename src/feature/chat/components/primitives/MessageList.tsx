import { Message } from '../../types';
import { MessageListProps } from '../type';

const MessageStatusIcon = ({ status }: { status?: string }) => {
  switch (status) {
    case 'sending':
      return (
        <div className="border-2 border-white/30 border-t-white rounded-full w-3 h-3 animate-spin" />
      );
    case 'sent':
      return (
        <svg
          className="w-4 h-4 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    case 'delivered':
      return (
        <svg
          className="w-4 h-4 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13l4 4L23 7"
          />
        </svg>
      );
    case 'failed':
      return (
        <svg
          className="w-4 h-4 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const VideoStatusBadge = ({ status }: { status?: string }) => {
  const config: Record<string, { label: string; className: string }> = {
    under_review: {
      label: 'განხილვაშია',
      className: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    },
    approved: {
      label: 'დამტკიცებულია',
      className: 'bg-green-500/20 text-green-300 border border-green-500/30',
    },
    rejected: {
      label: 'უარყოფილია',
      className: 'bg-red-500/20 text-red-300 border border-red-500/30',
    },
  };
  const s = config[status ?? ''];
  if (!s) return null;
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${s.className}`}
    >
      {s.label}
    </span>
  );
};

const MessageItem = ({ message }: { message: Message }) => {
  const senderName = message.senderFirstName
    ? message.senderLastName
      ? `${message.senderFirstName} ${message.senderLastName}`
      : message.senderFirstName
    : `User ${message.senderId}`;

  return (
    <div className="mb-4 text-white">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="opacity-70 font-bold text-xs">{senderName}</span>
        <span className="opacity-40 text-[10px]">
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      </div>

      {message.messageType === 'feedback_video' ? (
        <div className="bg-[#FFFFFF14] border border-white/10 rounded-xl w-full max-w-[300px] overflow-hidden">
          <video
            src={message.videoUrl ?? undefined}
            poster={message.videoCoverUrl ?? undefined}
            controls
            className="bg-black w-full object-cover aspect-video"
          />
          <div className="flex justify-between items-center gap-2 px-3 py-2">
            <p className="font-medium text-white text-sm truncate">
              {message.videoTitle || message.content}
            </p>
            <VideoStatusBadge status={message.videoStatus} />
          </div>
        </div>
      ) : (
        <div className="flex items-end gap-2">
          <div className="inline-block bg-[#FFFFFF36] p-2 rounded-lg text-[15px]">
            {message.content}
          </div>
          <MessageStatusIcon status={message.status} />
        </div>
      )}
    </div>
  );
};

const MessageList = ({
  messages,
  isLoadingChannel,
  selectedChannelId,
  hasMore,
  isLoadingMore,
  loadMoreTriggerRef,
}: MessageListProps) => {
  if (!selectedChannelId) {
    return (
      <div className="flex justify-center items-center h-full text-white/50">
        აირჩიეთ არხი
      </div>
    );
  }

  if (isLoadingChannel) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="border-4 border-white/20 border-t-white rounded-full w-8 h-8 animate-spin" />
          <span className="text-white/50 text-sm">იტვირთება...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={loadMoreTriggerRef} className="h-4">
        {isLoadingMore && hasMore && (
          <div className="flex justify-center py-2">
            <div className="border-2 border-white/20 border-t-white rounded-full w-6 h-6 animate-spin" />
          </div>
        )}
      </div>
      {messages.map((msg) => (
        <MessageItem
          key={msg.tempId ?? `msg-${msg.id}-${msg.createdAt}`}
          message={msg}
        />
      ))}
    </>
  );
};

export default MessageList;
