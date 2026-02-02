import Image from 'next/image';

interface ChatHeaderProps {
  channelTitle: string;
  channelImage: string;
  visibleChannels: Array<{ id: string; image: string; title: string }>;
  activeTab: string | null;
  onTabClick: (tabId: string) => void;
}

const ChatHeader = ({
  channelTitle,
  channelImage,
  visibleChannels,
  activeTab,
  onTabClick,
}: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-[26px] border-[#E0E0E0] border-b min-h-[49px]">
      <div className="flex items-center gap-2">
        <Image src={channelImage} alt={channelTitle} width={20} height={20} />
        <span className="font-[600] text-[16px] text-white">
          {channelTitle}
        </span>
      </div>

      <div className="flex justify-between items-center w-full max-w-[162px]">
        {visibleChannels.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabClick(item.id)}
            className={`cursor-pointer transition-opacity w-[40px] h-[40px] flex items-center justify-center ${
              activeTab === item.id
                ? 'opacity-100 bg-[#FFFFFF36] rounded-[10px]'
                : 'opacity-60 hover:opacity-80'
            }`}
          >
            <Image src={item.image} alt={item.title} width={24} height={24} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;
