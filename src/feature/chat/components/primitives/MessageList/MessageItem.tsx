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
        <div className="max-w-[529px]">
          <div className="flex items-start gap-2">
            <FeedbackVideoMessage message={message} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-2">
              <div className="inline-block bg-[#FFFFFF36] p-2 rounded-lg text-[15px]">
                {message.content}
              </div>

              <MessageStatusIcon status={message.status} />
            </div>

            <MessageReactionPicker
              message={message}
              isOpen={isPickerOpen}
              onToggleOpen={onTogglePicker}
              onClose={onClosePicker}
            />
          </div>

          <MessageReactionPills message={message} />
        </div>
      )}
    </div>
  );
};
