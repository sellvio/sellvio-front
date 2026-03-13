import { memo } from 'react';
import { MessageListProps } from '@/feature/chat/types';
import { MessageItem } from './MessageItem';
import { Loader2 } from 'lucide-react';

const MessageList = memo(
  ({
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
        <div className="flex flex-col justify-center items-center gap-3 h-full">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <span className="text-white/50 text-sm">იტვირთება...</span>
        </div>
      );
    }

    return (
      <>
        <div ref={loadMoreTriggerRef} className="h-4">
          {isLoadingMore && hasMore && (
            <div className="flex justify-center py-2">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        {messages.map((message) => (
          <MessageItem
            key={message.tempId ?? `msg-${message.id}-${message.createdAt}`}
            message={message}
          />
        ))}
      </>
    );
  }
);

MessageList.displayName = 'MessageList';
export default MessageList;
