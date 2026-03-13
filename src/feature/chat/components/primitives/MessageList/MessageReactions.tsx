'use client';

import { memo, useMemo, useState } from 'react';
import { Message } from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { REACTION_OPTIONS } from '@/feature/common/data/reactionOptions';

interface Props {
  message: Message;
}

export const MessageReactions = memo(({ message }: Props) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const currentUser = useChatStore((state) => state.currentUser);
  const addReaction = useSocketStore((state) => state.addReaction);
  const removeReaction = useSocketStore((state) => state.removeReaction);

  const reactions = message.reactions ?? [];

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

  const handleToggleReaction = (emojiId: number) => {
    if (!currentUser) return;

    const alreadyReacted = reactedEmojiIds.has(emojiId);

    if (alreadyReacted) {
      removeReaction(message.channelId, message.id, emojiId);
      return;
    }

    addReaction(message.channelId, message.id, emojiId);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      {reactions.map((reaction) => {
        const isActive = currentUser
          ? reaction.users.some((user) => user.id === currentUser.id)
          : false;

        const localOption = REACTION_OPTIONS.find(
          (option) => option.id === reaction.emojiId
        );

        return (
          <button
            key={reaction.emojiId}
            type="button"
            onClick={() => handleToggleReaction(reaction.emojiId)}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs transition cursor-pointer ${
              isActive
                ? 'bg-[#0866FF33] border-[#0866FF] text-white'
                : 'bg-white/10 border-white/10 text-white/80 hover:bg-white/15'
            }`}
          >
            <span>{localOption?.emoji ?? reaction.emoji ?? '🙂'}</span>
            <span>{reaction.users.length}</span>
          </button>
        );
      })}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsPickerOpen((prev) => !prev)}
          className="hover:bg-white/10 px-2 py-1 border border-white/10 rounded-full text-white/80 text-xs transition cursor-pointer"
        >
          +
        </button>

        {isPickerOpen && (
          <div className="bottom-full left-0 z-20 absolute flex items-center gap-1 bg-[#0B1739] shadow-lg mb-2 p-2 border border-white/10 rounded-xl">
            {REACTION_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                title={option.label}
                onClick={() => {
                  handleToggleReaction(option.id);
                  setIsPickerOpen(false);
                }}
                className="hover:bg-white/10 p-2 rounded-lg text-lg transition cursor-pointer"
              >
                {option.emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

MessageReactions.displayName = 'MessageReactions';
