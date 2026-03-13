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
  const pendingReactionOperations = useSocketStore(
    (state) => state.pendingReactionOperations
  );

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

  const hasAnyReactionFromCurrentUser = reactedEmojiIds.size > 0;

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

        const pendingAction = pendingEmojiActions.get(reaction.emojiId);

        const localOption = REACTION_OPTIONS.find(
          (option) => option.id === reaction.emojiId
        );

        return (
          <button
            key={reaction.emojiId}
            type="button"
            onClick={() => handleToggleReaction(reaction.emojiId)}
            disabled={Boolean(pendingAction)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
              isActive
                ? 'bg-[#0866FF33] border-[#0866FF] text-white'
                : 'bg-white/10 border-white/10 text-white/80 hover:bg-white/15'
            }`}
          >
            <span>{localOption?.emoji ?? '🙂'}</span>
            <span>{reaction.users.length}</span>
          </button>
        );
      })}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsPickerOpen((prev) => !prev)}
          className={`px-2.5 py-1 border rounded-full text-xs transition cursor-pointer ${
            hasAnyReactionFromCurrentUser
              ? 'bg-[#0866FF26] border-[#0866FF] text-white'
              : 'border-white/10 text-white/80 hover:bg-white/10'
          }`}
        >
          +
        </button>

        {isPickerOpen && (
          <div className="bottom-full left-0 z-20 absolute flex items-center gap-1 bg-[#0B1739] shadow-lg mb-2 p-2 border border-white/10 rounded-xl">
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
                  className={`p-2 rounded-lg text-lg transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'bg-[#0866FF33] ring-1 ring-[#0866FF]'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {option.emoji}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

MessageReactions.displayName = 'MessageReactions';
