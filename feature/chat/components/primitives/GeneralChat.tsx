import Image from "next/image";
import { channelsData, newChannelsData } from "../../data/chatData";

const GeneralChat = () => {
  const generalChannel = channelsData[0].channels.find(
    (ch) => ch.id === "general-chat"
  );

  return (
    <div className="flex flex-col h-screen w-full max-w-[1440px] px-[13px] py-[8px]bg-[#001541D6] py-[9px]">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <Image
            src={generalChannel.image}
            alt={generalChannel.title}
            width={20}
            height={20}
          />
          <span className="text-[16px] font-[600] text-white">
            {generalChannel.title}
          </span>
        </div>
        <div className="flex items-center justify-between max-w-[162px] w-full">
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

      {/* Chat area (flex-1 ensures it grows and pushes input down) */}
      <div className="flex-1 overflow-y-auto mt-2">
        {/* აქ შეგიძლია ჩადო chat messages */}
      </div>

      {/* Input + plus icon */}
      <div className="flex items-center gap-2 mt-2 pb-[10px]">
        <div className="relative flex items-center w-full">
          <Image
            src="/images/chatIcons/svg/plus.svg"
            width={24}
            height={24}
            alt="plus"
            className="absolute left-2"
          />
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full pl-[36px] p-2 border border-[#E0E0E0] rounded bg-[#FFFFFF36] text-white focus:outline-none py-[10px] "
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralChat;
