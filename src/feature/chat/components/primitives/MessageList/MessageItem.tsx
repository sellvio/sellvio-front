import { memo } from 'react';
import { Message } from '@/feature/chat/types';
import { MessageStatusIcon } from './MessageStatusIcon';
import { FeedbackVideoMessage } from './FeedbackVideoMessage';

interface Props {
  message: Message;
}

const getSenderName = (msg: Message): string => {
  if (msg.senderFirstName && msg.senderLastName)
    return `${msg.senderFirstName} ${msg.senderLastName}`;
  if (msg.senderFirstName) return msg.senderFirstName;
  return `User ${msg.senderId}`;
};

export const MessageItem = memo(({ message }: Props) => (
  <div className="mb-4 text-white">
    <div className="flex items-baseline gap-2 mb-1">
      <span className="opacity-70 font-bold text-xs">
        {getSenderName(message)}
      </span>
      <span className="opacity-40 text-[10px]">
        {new Date(message.createdAt).toLocaleTimeString()}
      </span>
    </div>

    {message.messageType === 'feedback_video' ? (
      <FeedbackVideoMessage message={message} />
    ) : (
      <div className="flex items-end gap-2">
        <div className="inline-block bg-[#FFFFFF36] p-2 rounded-lg text-[15px]">
          {message.content}
        </div>
        <MessageStatusIcon status={message.status} />
      </div>
    )}
  </div>
));

MessageItem.displayName = 'MessageItem';
