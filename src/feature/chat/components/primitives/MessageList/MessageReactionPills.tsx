'use client';

import { useMemo } from 'react';
import { Message } from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { MessageReactionPill } from './MessageReactionPill';

interface Props {
  message: Message;
}

export const MessageReactionPills = ({ message }: Props) => {
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

  if (!reactions.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {reactions.map((reaction) => {
        const isActive = currentUser
          ? reaction.users.some((user) => user.id === currentUser.id)
          : false;

        const pendingAction = pendingEmojiActions.get(reaction.emojiId);

        return (
          <MessageReactionPill
            key={reaction.emojiId}
            emojiId={reaction.emojiId}
            count={reaction.users.length}
            isActive={isActive}
            isPending={Boolean(pendingAction)}
            onClick={() => handleToggleReaction(reaction.emojiId)}
          />
        );
      })}
    </div>
  );
};
