import { memo } from 'react';
import { REACTION_OPTIONS } from '@/feature/common/data/reactionOptions';

interface Props {
  isOpen: boolean;
  hasAnyReactionFromCurrentUser: boolean;
  reactedEmojiIds: Set<number>;
  pendingEmojiActions: Map<number, 'add' | 'remove'>;
  onToggleOpen: () => void;
  onSelect: (emojiId: number) => void;
}

export const MessageReactionPicker = memo(
  ({
    isOpen,
    hasAnyReactionFromCurrentUser,
    reactedEmojiIds,
    pendingEmojiActions,
    onToggleOpen,
    onSelect,
  }: Props) => {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={onToggleOpen}
          className={`border shrink-0 w-[20px] h-[20px] flex items-center justify-center rounded-full text-xs transition cursor-pointer ${
            hasAnyReactionFromCurrentUser
              ? 'bg-[#0866FF26] border-[#0866FF] text-white'
              : 'border-white/10 text-white/80 hover:bg-white/10'
          }`}
        >
          +
        </button>

        {isOpen && (
          <div className="bottom-full left-0 z-20 absolute flex items-center gap-1 bg-[#0B1739] shadow-lg mb-[2px] p-[5px] border border-white/10 rounded-xl">
            {REACTION_OPTIONS.map((option) => {
              const isSelected = reactedEmojiIds.has(option.id);
              const pendingAction = pendingEmojiActions.get(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  title={option.label}
                  disabled={Boolean(pendingAction)}
                  onClick={() => onSelect(option.id)}
                  className={`p-[3px] rounded-lg text-lg transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'bg-[#0866FF33] ring-1 ring-[#0866FF]'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-center items-center w-[25px] h-[25px]">
                    {option.emoji}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

MessageReactionPicker.displayName = 'MessageReactionPicker';
