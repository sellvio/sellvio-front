'use client';

import { useMemo, useState, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';
import { Message } from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { REACTION_OPTIONS } from '@/feature/common/data/reactionOptions';
import Image from 'next/image';

interface Props {
  message: Message;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
}

export const MessageReactionPicker = ({
  message,
  isOpen,
  onToggleOpen,
  onClose,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const currentUser = useChatStore((state) => state.currentUser);
  const isAdmin = useChatStore((state) => state.isAdmin);
  const selectedChannelId = useChatStore((state) => state.selectedChannelId);

  const addReaction = useSocketStore((state) => state.addReaction);
  const removeReaction = useSocketStore((state) => state.removeReaction);
  const pinMessage = useSocketStore((state) => state.pinMessage);
  const deleteMessage = useSocketStore((state) => state.deleteMessage);
  const pendingReactionOperations = useSocketStore(
    (state) => state.pendingReactionOperations
  );
  const pendingPinMessageIds = useSocketStore(
    (state) => state.pendingPinMessageIds
  );

  const reactions = message.reactions ?? [];
  const isPinLoading = pendingPinMessageIds.includes(message.id);

  const canDelete =
    Boolean(currentUser) &&
    (isAdmin || currentUser?.id === message.senderId) &&
    message.messageType !== 'feedback_video';

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const reactedEmojiIds = useMemo(() => {
    if (!currentUser) return new Set<number>();

    return new Set(
      reactions
        .filter((reaction) =>
          reaction.users.some((user) => user.id === currentUser.id)
        )
        .map((reaction) => reaction.emojiId)
    );
  }, [currentUser, reactions]);

  const pendingEmojiActions = useMemo(() => {
    if (!currentUser) return new Map<number, 'add' | 'remove'>();

    const relatedOperations = pendingReactionOperations.filter(
      (operation) =>
        operation.messageId === message.id &&
        operation.userId === currentUser.id
    );

    const result = new Map<number, 'add' | 'remove'>();

    for (const operation of relatedOperations) {
      result.set(operation.emojiId, operation.action);
    }

    return result;
  }, [currentUser, message.id, pendingReactionOperations]);

  const handleToggleReaction = (emojiId: number) => {
    if (!currentUser) return;
    const pendingAction = pendingEmojiActions.get(emojiId);
    if (pendingAction) return;
    const alreadyReacted = reactedEmojiIds.has(emojiId);

    if (alreadyReacted) {
      removeReaction(message.channelId, message.id, emojiId);
      onClose();
      return;
    }

    addReaction(message.channelId, message.id, emojiId);
    onClose();
  };

  const handlePinToggle = () => {
    if (!selectedChannelId || isPinLoading || !isAdmin) return;
    pinMessage(selectedChannelId, message.id, !message.pinned);
    onClose();
  };

  const handleCopy = async () => {
    const textToCopy = message.content?.trim();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => onClose(), 800);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleDelete = () => {
    if (!selectedChannelId || !canDelete) return;

    deleteMessage(selectedChannelId, message.id);
    onClose();
  };

  const handleReply = () => {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(
      new CustomEvent('chat:set-reply-message', {
        detail: { message },
      })
    );

    onClose();
  };

  return (
    <div className="relative">
      <div className="flex gap-[11px] bg-[#38466D] p-[6px] border border-[#FFFFFF36] rounded-[6px] w-full max-w-[232px] h-[42px]">
        <div className="flex gap-[3px]">
          {REACTION_OPTIONS.map((option) => {
            const isSelected = reactedEmojiIds.has(option.id);
            const pendingAction = pendingEmojiActions.get(option.id);

            return (
              <button
                key={option.id}
                type="button"
                title={option.label}
                disabled={Boolean(pendingAction)}
                onClick={() => handleToggleReaction(option.id)}
                className={`p-[8px] rounded-[6px] w-[28px] h-[28px] cursor-pointer flex items-center justify-center bg-[#FFFFFF36] disabled:opacity-70 disabled:cursor-not-allowed ${
                  isSelected
                    ? 'bg-[#0866FF33] ring-1 ring-[#0866FF]'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex justify-center items-center">
                  {option.emoji}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-[#FFFFFF36] w-[1px] h-full"></div>

        <div className="flex justify-between items-center w-[75px] h-full">
          <button
            type="button"
            onClick={handleReply}
            className="cursor-pointer"
          >
            <Image
              src={'/images/messageIcons/svg/reply-message.svg'}
              alt="reply"
              width={17}
              height={17}
            />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="transition-all duration-200 cursor-pointer"
          >
            {isCopied ? (
              <Check className="w-[17px] h-[17px] text-[#FFFFFF] animate-in zoom-in" />
            ) : (
              <Image
                src={'/images/messageIcons/svg/copy.svg'}
                alt="copy"
                width={17}
                height={17}
              />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleOpen}
            className="cursor-pointer"
          >
            <Image
              src={'/images/messageIcons/svg/moreInfo.svg'}
              alt="moreInfo"
              width={17}
              height={17}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="top-[-33px] right-[35px] z-[100] absolute flex flex-col gap-[15px] bg-[#38466D] p-[17px] border border-[#FFFFFF36] rounded-[8px] w-full max-w-[221px]">
          <div className="flex justify-between gap-[4px] w-full max-h-[44px]">
            {REACTION_OPTIONS.map((option) => {
              const isSelected = reactedEmojiIds.has(option.id);
              const pendingAction = pendingEmojiActions.get(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  title={option.label}
                  disabled={Boolean(pendingAction)}
                  onClick={() => handleToggleReaction(option.id)}
                  className={`p-[12px] rounded-[8px] w-[44px] h-[44px] cursor-pointer flex items-center justify-center bg-[#FFFFFF36] disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'bg-[#0866FF33] ring-1 ring-[#0866FF]'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-center items-center">
                    {option.emoji}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#FFFFFF36] w-full h-[1px]"></div>

          <div className="flex flex-col gap-[15px]">
            <button
              type="button"
              onClick={handleReply}
              className="flex justify-between hover:opacity-80 w-full text-left transition-opacity cursor-pointer"
            >
              <p className="font-semibold text-[13px]">პასუხი</p>
              <Image
                src={'/images/messageIcons/svg/reply.svg'}
                alt="reply"
                width={17}
                height={17}
              />
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="group flex justify-between hover:opacity-80 w-full text-left transition-opacity cursor-pointer"
            >
              <p className="font-semibold text-[13px]">
                {isCopied ? 'დაკოპირდა' : 'დაკოპირება'}
              </p>
              <Image
                src={'/images/messageIcons/svg/copy-popup.svg'}
                alt="copy-popup"
                width={17}
                height={17}
              />
            </button>

            {isAdmin && message.messageType !== 'feedback_video' && (
              <button
                type="button"
                disabled={isPinLoading}
                onClick={handlePinToggle}
                className="flex justify-between items-center hover:opacity-80 disabled:opacity-60 w-full transition-opacity cursor-pointer disabled:cursor-not-allowed"
              >
                <p className="font-semibold text-[13px]">
                  {isPinLoading
                    ? 'იტვირთება...'
                    : message.pinned
                      ? 'პინის მოხსნა'
                      : 'დაპინვა'}
                </p>
                {isPinLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Image
                    src={'/images/messageIcons/svg/pin.svg'}
                    alt="pin"
                    width={17}
                    height={17}
                  />
                )}
              </button>
            )}
          </div>

          {canDelete && (
            <>
              <div className="bg-[#FFFFFF36] w-full h-[1px]"></div>

              <button
                type="button"
                onClick={handleDelete}
                className="group flex justify-between hover:opacity-80 w-full text-left transition-opacity cursor-pointer"
              >
                <p className="font-semibold text-[13px]">წაშლა</p>
                <Image
                  src={'/images/messageIcons/svg/delete.svg'}
                  alt="delete"
                  width={17}
                  height={17}
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
