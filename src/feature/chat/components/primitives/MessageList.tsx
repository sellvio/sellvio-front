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

const MessageItem = ({ message }: { message: Message }) => {
  const senderName = message.senderFirstName
    ? message.senderLastName
      ? `${message.senderFirstName} ${message.senderLastName}`
      : message.senderFirstName
    : `User ${message.senderId}`;

  return (
    <div className="mb-4 text-white">
      <div className="flex items-baseline gap-2">
        <span className="opacity-70 font-bold text-xs">{senderName}</span>
        <span className="opacity-40 text-[10px]">
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      </div>
      <div className="flex items-end gap-2 mt-1">
        <div className="inline-block bg-[#FFFFFF36] p-2 rounded-lg text-[15px]">
          {message.content}
        </div>
        <MessageStatusIcon status={message.status} />
      </div>
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
