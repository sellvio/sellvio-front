import Image from 'next/image';

interface MessageInputProps {
  text: string;
  setText: (text: string) => void;
  onSend: () => void;
  disabled: boolean;
  selectedChannelId: number | null;
}

const MessageInput = ({
  text,
  setText,
  onSend,
  disabled,
  selectedChannelId,
}: MessageInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) {
      onSend();
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 mb-4 px-[7px] min-h-[56px]">
      <div className="relative flex items-center w-full">
        <Image
          src="/images/chatIcons/svg/plus.svg"
          width={24}
          height={24}
          alt="plus"
          className="left-2 absolute opacity-70"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            selectedChannelId ? 'Type a message...' : 'Select a channel first'
          }
          className="bg-[#FFFFFF36] disabled:opacity-50 py-[10px] pl-[36px] rounded-[10px] focus:outline-none w-full h-[56px] text-white placeholder:text-white/50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default MessageInput;
