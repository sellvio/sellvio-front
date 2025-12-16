import Image from 'next/image';
import { chatHeaderData } from '../data/chatHeaderData';

const ChatHeader = () => {
  return (
    <header className="flex justify-between items-center px-[33px] py-[16px]">
      <Image
        src={'/images/chatIcons/svg/ChatSellvioHeader.svg'}
        alt="sellvioHeader"
        width={235}
        height={63}
      />
      <div className="flex gap-[16px]">
        {chatHeaderData.map((eachElement) => (
          <div
            key={eachElement.id}
            className="bg-[#0866FF1A] p-[15px] border border-[#0000001A] rounded-[16px] cursor-pointer"
          >
            <Image
              src={eachElement.headerIcon}
              width={20}
              height={20}
              alt={eachElement.name}
            />
          </div>
        ))}
      </div>
    </header>
  );
};

export default ChatHeader;
