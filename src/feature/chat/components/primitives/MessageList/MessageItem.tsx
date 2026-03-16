'use client';

import { Message } from '@/feature/chat/types';
import { MessageStatusIcon } from './MessageStatusIcon';
import { FeedbackVideoMessage } from './FeedbackVideoMessage';
import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageReactionPills } from './MessageReactionPills';

interface Props {
  message: Message;
  isPickerOpen: boolean;
  onTogglePicker: () => void;
  onClosePicker: () => void;
}

const getSenderName = (msg: Message): string => {
  if (msg.senderFirstName && msg.senderLastName) {
    return `${msg.senderFirstName} ${msg.senderLastName}`;
  }

  if (msg.senderFirstName) return msg.senderFirstName;

  return `User ${msg.senderId}`;
};

export const MessageItem = ({
  message,
  isPickerOpen,
  onTogglePicker,
  onClosePicker,
}: Props) => {
  return (
    <div className="group hover:bg-[#d9d9d90d] mb-4 text-white transition-all duration-200 ease-in-out">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="opacity-70 font-bold text-xs">
          {getSenderName(message)}
        </span>

        <span className="opacity-40 text-[10px]">
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>

        {message.pinned && (
          <span className="bg-[#0866FF26] px-2 py-[2px] rounded-full font-medium text-[#8BB8FF] text-[10px]">
            Pinned
          </span>
        )}
      </div>

      {message.messageType === 'feedback_video' ? (
        <div className="max-w-[529px]">
          <div className="flex items-start gap-2">
            <FeedbackVideoMessage message={message} />
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-start gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-2">
              <div className="inline-block bg-[#FFFFFF36] p-2 rounded-lg text-[15px]">
                {message.replyTo && (
                  <div className="bg-[#FFFFFF14] mb-2 px-3 py-2 border-[#8BB8FF] border-l-2 rounded-md max-w-[320px]">
                    <p className="mb-1 font-semibold text-[#8BB8FF] text-[12px]">
                      {message.replyTo.senderFirstName ??
                        `User ${message.replyTo.senderId}`}
                    </p>
                    <p className="opacity-70 text-[12px] break-words line-clamp-2">
                      {message.replyTo.content}
                    </p>
                  </div>
                )}

                <p className="break-words">{message.content}</p>
              </div>

              <MessageStatusIcon status={message.status} />
            </div>

            <div
              className={`top-[-38px] right-[46px] absolute transition-all duration-200 ${
                isPickerOpen
                  ? 'opacity-100 visible pointer-events-auto'
                  : 'opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
              }`}
            >
              <MessageReactionPicker
                message={message}
                isOpen={isPickerOpen}
                onToggleOpen={onTogglePicker}
                onClose={onClosePicker}
              />
            </div>
          </div>

          <MessageReactionPills message={message} />
        </div>
      )}
    </div>
  );
};
