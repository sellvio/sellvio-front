import { REACTION_OPTIONS } from '@/feature/common/data/reactionOptions';

interface Props {
  emojiId: number;
  count: number;
  isActive: boolean;
  isPending: boolean;
  onClick: () => void;
}

export const MessageReactionPill = ({
  emojiId,
  count,
  isActive,
  isPending,
  onClick,
}: Props) => {
  const localOption = REACTION_OPTIONS.find((option) => option.id === emojiId);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
        isActive
          ? 'bg-[#0866FF33] border-[#0866FF] text-white'
          : 'bg-white/10 border-white/10 text-white/80 hover:bg-white/15'
      }`}
    >
      <span>{localOption?.emoji ?? '🙂'}</span>
      <span>{count}</span>
    </button>
  );
};
