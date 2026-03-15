'use client';

import { Loader2 } from 'lucide-react';
import { Message } from '@/feature/chat/types';
import { MessageStatusIcon } from './MessageStatusIcon';
import { FeedbackVideoMessage } from './FeedbackVideoMessage';
import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageReactionPills } from './MessageReactionPills';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';

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
  const isAdmin = useChatStore((s) => s.isAdmin);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);
  const pinMessage = useSocketStore((s) => s.pinMessage);
  const pendingPinMessageIds = useSocketStore((s) => s.pendingPinMessageIds);

  const isPinLoading = pendingPinMessageIds.includes(message.id);

  const handlePinToggle = () => {
    if (!selectedChannelId || isPinLoading) return;
    pinMessage(selectedChannelId, message.id, !message.pinned);
  };

  return (
    <div className="mb-4 text-white">
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

            {isAdmin && message.messageType !== 'feedback_video' && (
              <button
                type="button"
                disabled={isPinLoading}
                onClick={handlePinToggle}
                className={`border px-2 h-[28px] rounded-lg text-xs transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  message.pinned
                    ? 'border-[#0866FF] bg-[#0866FF26] text-white'
                    : 'border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                {isPinLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Loading
                  </>
                ) : message.pinned ? (
                  'Unpin'
                ) : (
                  'Pin'
                )}
              </button>
            )}
          </div>

          <MessageReactionPills message={message} />
        </div>
      )}
    </div>
  );
};
