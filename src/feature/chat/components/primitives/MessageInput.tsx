'use client';

import Image from 'next/image';
import { MessageInputProps } from '@/feature/chat/types';

const MessageInput = ({
  text,
  setText,
  onSend,
  disabled,
  selectedChannelId,
  placeholder,
}: MessageInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled && selectedChannelId) {
      onSend();
    }
  };

  return (
    <div className="px-[7px] pb-4 w-full">
      <div className="flex items-center gap-2 bg-[#FFFFFF36] px-[20px] rounded-lg min-h-[56px]">
        <Image
          src="/images/chatIcons/svg/smile.svg"
          alt="emoji"
          width={22}
          height={22}
        />

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || !selectedChannelId}
          placeholder={
            placeholder ??
            (selectedChannelId ? 'შეიყვანე შეტყობინება' : 'აირჩიე არხი')
          }
          className="bg-transparent disabled:opacity-70 outline-none w-full h-[56px] text-white placeholder:text-white/50 disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !selectedChannelId || !text.trim()}
          className="disabled:opacity-50 text-white cursor-pointer disabled:cursor-not-allowed"
        >
          გაგზავნა
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
