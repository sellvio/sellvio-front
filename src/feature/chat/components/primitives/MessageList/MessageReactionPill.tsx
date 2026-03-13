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
      className={`w-[46px] h-[35px] rounded-[10px] cursor-pointer flex gap-[4px] items-center justify-center ${
        isActive
          ? 'bg-[#FFFFFF36] border-[#0866FF] text-white'
          : 'bg-white/10 border-white/10 text-white/80 hover:bg-white/15'
      }`}
    >
      <span>{localOption?.emoji ?? '🙂'}</span>
      <span>{count}</span>
    </button>
  );
};
