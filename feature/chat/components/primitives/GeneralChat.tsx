import Image from 'next/image';
import { channelsData, newChannelsData } from '../../data/chatData';
import Member from './Member';

const GeneralChat = () => {
  const generalChannel = channelsData[0].channels.find(
    (ch) => ch.id === 'general-chat'
  );

  return (
    <div className="flex flex-col bg-[#001541D6] py-[8px] w-full max-w-[1440px] h-screen">
      <div className="flex justify-between items-center px-[26px] pb-3 border-[#E0E0E0] border-b">
        <div className="flex items-center gap-2">
          <Image
            src={generalChannel.image}
            alt={generalChannel.title}
            width={20}
            height={20}
          />
          <span className="font-[600] text-[16px] text-white">
            {generalChannel.title}
          </span>
        </div>
        <div className="flex justify-between items-center w-full max-w-[162px]">
          {newChannelsData.map((item) => (
            <Image
              key={item.id}
              src={item.image}
              alt={item.title}
              width={24}
              height={24}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end w-full h-full">
        <Member />
      </div>
      <div className="flex items-center gap-2 mt-2 px-[7px] pb-[10px] min-h-[56px]">
        <div className="relative flex items-center w-full">
          <Image
            src="/images/chatIcons/svg/plus.svg"
            width={24}
            height={24}
            alt="plus"
            className="left-2 absolute"
          />
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-[#FFFFFF36] py-[10px] pl-[36px] rounded-[10px] focus:outline-none w-full h-[56px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralChat;
