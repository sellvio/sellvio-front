import Image from 'next/image';
import { ChanelInfoSidebarProps } from '../../types';

const ChanelInfoSidebar = ({
  isChatFull,
  chatFull,
}: ChanelInfoSidebarProps) => {
  return (
    <div className="flex flex-col gap-[10px] bg-[#001541D6] py-[16px] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      <div className="flex items-center gap-[10px] px-[13px] w-full">
        <button onClick={() => isChatFull?.((prev) => !prev)}>
          <Image
            src={`${chatFull ? '/images/chatIcons/svg/sizeDownChat.svg' : '/images/chatIcons/svg/sizeUpChat.svg'}`}
            alt="chatSize"
            width={21}
            height={21}
            className="cursor-pointer"
          />
        </button>
        <Image
          src={'/images/chatIcons/svg/hashtag.svg'}
          alt="# icon"
          width={16}
          height={16}
        />
        <p className="text-[15px] text-white">საერთო-ჩატი</p>
      </div>
      <div className="pl-[13px]">
        <div className="hover:bg-[#FFFFFF36] px-[8px] py-[6px] rounded-tl-[6px] rounded-bl-[6px] cursor-pointer">
          <p className="font-semibold text-[15px] text-white">
            არხის ინფორმაცია
          </p>
        </div>
        <div className="hover:bg-[#FFFFFF36] px-[8px] py-[6px] rounded-tl-[6px] rounded-bl-[6px] cursor-pointer">
          <p className="font-semibold text-[15px] text-white">
            მოწვეის გაკეთება
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChanelInfoSidebar;
