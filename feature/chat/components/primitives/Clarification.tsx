'use client';
import Image from 'next/image';
import { ClarificationData } from '../../data/chatData';

const Clarification = () => {
  return (
    <div className="[border-bottom-left-radius:10px] [border-top-left-radius:10px] flex flex-col gap-[14px] bg-[linear-gradient(0deg,rgba(17,24,39,0.42),rgba(17,24,39,0.42)),linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1))] px-[7px] py-[11px] w-full max-w-[409px] h-full overflow-y-auto">
      {ClarificationData.map((eachElement) => (
        <div
          key={eachElement.id}
          className="flex items-center bg-[#FFFFFF1A] px-[22px] py-[11px] rounded-[8px] duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex flex-col justify-center gap-[15px]">
            <div className="flex gap-[7px]">
              <div className="relative bg-[#999999] rounded-full w-[31px] h-[31px]">
                <Image
                  src={'/images/chatIcons/svg/activeStatusIcon.svg'}
                  alt="userStatus"
                  width={8}
                  height={8}
                  className="right-[1px] bottom-[1px] absolute"
                />
              </div>
              <div className="flex items-center gap-[4px]">
                <p className="font-semibold text-[#FFFFFF] text-[15px]">
                  {eachElement.userName}
                </p>
                <p className="font-[400] text-[#FFFFFFAD] text-[15px]">
                  {eachElement.data}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[13px]">
              <div className="bg-[#D9D9D9] rounded-[10px] min-w-[74px] h-[83px]"></div>
              <div className="flex flex-col gap-[4px]">
                <p className="font-semibold text-[#FFFFFF] text-[15px]">
                  {eachElement.messageTitle}
                </p>
                <p className="font-[400] text-[#FFFFFFAD] text-[15px]">
                  {eachElement.message.length > 60
                    ? eachElement.message.slice(0, 60) + '...'
                    : eachElement.message}
                </p>
              </div>
            </div>
            <div className="flex gap-[13px]">
              <button className="hover:bg-[#0866FF] border border-[#0866FF] hover:border-[#C13D3F36] rounded-[10px] w-1/2 min-h-[38px] text-[#FFFFFF] text-[13px] transition-all duration-300 ease-in-out cursor-pointer">
                უარყოფა
              </button>
              <button className="hover:bg-[#0866FF] border border-[#0866FF] hover:border-[#C13D3F36] rounded-[10px] w-1/2 min-h-[38px] text-[#FFFFFF] text-[13px] transition-all duration-300 ease-in-out cursor-pointer">
                დადასტურება
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clarification;
