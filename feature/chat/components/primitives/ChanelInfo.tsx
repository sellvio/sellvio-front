import Image from 'next/image';
import { ChannelsProps } from '../../types';

const ChanelInfo = ({ setChatInfoOpen }: ChannelsProps) => {
  return (
    <div className="flex flex-col bg-[#001541D6] w-full max-w-[1440px] h-screen">
      <div className="flex justify-between items-center px-[26px] w-full min-h-[72px]">
        <p className="font-semibold text-[18px] text-white">არხის ინფორმაცია</p>
        <button
          onClick={() => setChatInfoOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <Image
            src={'/images/chatIcons/svg/closeButton.svg'}
            alt="closeButton"
            width={40}
            height={40}
          />
        </button>
      </div>
      <div className="flex flex-col gap-[29px] mt-[14px] px-[26px]">
        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="chanelName"
            className="font-semibold text-[15px] text-white"
          >
            არხის სახელი
          </label>
          <div className="relative w-full min-h-[58px]">
            <Image
              src={'/images/chatIcons/svg/hashtag.svg'}
              alt="# icon"
              width={16}
              height={16}
              className="top-1/2 left-[16px] absolute -translate-y-1/2"
            />
            <input
              className="shadow-[4px_5px_6px_0px_#FFFFFF42_inset,-1px_-3px_4px_0px_#FFFFFF42_inset,0px_8px_13px_0px_#0000000A] px-[44px] border-[2px] border-white rounded-[8px] outline-none w-full min-h-[58px] text-[18px] text-white"
              type="text"
              id="chanelName"
              placeholder="საერთო-ჩატი"
            />
            <Image
              src={'/images/chatIcons/svg/smile.svg'}
              alt="# icon"
              width={24}
              height={24}
              className="top-1/2 right-[16px] absolute -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="chanelName"
            className="font-semibold text-[15px] text-white"
          >
            არხის აღწერა
          </label>
          <div className="relative w-full min-h-[58px]">
            <input
              className="shadow-[4px_5px_6px_0px_#FFFFFF42_inset,-1px_-3px_4px_0px_#FFFFFF42_inset,0px_8px_13px_0px_#0000000A] pr-[44px] pl-[18px] border-[2px] border-white rounded-[8px] outline-none w-full min-h-[58px] text-[18px] text-white"
              type="text"
              id="chanelName"
              placeholder="გააგებინე ყველას თუ როგორ გამოიყენონ ეს არხი"
            />
            <Image
              src={'/images/chatIcons/svg/smile.svg'}
              alt="# icon"
              width={24}
              height={24}
              className="top-1/2 right-[16px] absolute -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <div className="font-semibold text-[15px] text-white">
            არხის ხილვადობა
          </div>
          <div className="relative flex items-center px-[50px] border border-white rounded-[8px] w-full min-h-[58px]">
            <Image
              src={'/images/chatIcons/svg/visibility.svg'}
              alt="# icon"
              width={18}
              height={22}
              className="top-1/2 left-[16px] absolute -translate-y-1/2"
            />
            <p className="font-semibold text-white">ხილვადობა</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChanelInfo;
