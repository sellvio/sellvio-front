'use client';

import Image from 'next/image';
import { heroScrollDownButton } from '../../data/heroButtonsData';
import Link from 'next/link';
// import { Company, Creator } from '@/public/images/svg';

const HeroSectionBottomSide = () => {
  return (
    <div className="flex gap-[42px] mt-[49px] w-full">
      <div className="flex gap-[11px]">
        {heroScrollDownButton.map((eachElement) => (
          <Link href={eachElement.href} key={eachElement.id}>
            <button className="flex justify-center items-center gap-[10px] bg-[#0866FF1F] px-[30px] py-[18px] rounded-[33px] font-medium text-[18px] text-white cursor-pointer">
              {eachElement.label}
              <div className="mt-[2px]">
                <Image
                  src="/images/svg/arrow-down.svg"
                  alt="arrow down"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-[34px] mt-[14px]">
        <p className="flex font-bold text-[#1E1E1E] text-[20px]">
          დარეგისტრირდი როგორც:
        </p>
        <div className="flex items-center gap-[26px]">
          <button className="group flex justify-center items-center gap-[10px] bg-[#FFFFFFA1] hover:bg-[#583CCF] border border-[#0000001F] rounded-[8px] w-[192px] min-h-[52px] font-bold text-[18px] transition-all duration-300 ease-in-out cursor-pointer">
            {/* <Creator className="text-[#0866FF] group-hover:text-white" /> */}
            <span className="text-[#000000] group-hover:text-white">
              შემქმნელი
            </span>
          </button>

          <p className="font-bold text-[#1E1E1E] text-[20px]">ან</p>

          <button className="group flex justify-center items-center gap-[10px] bg-[#FFFFFFA1] hover:bg-[#583CCF] border border-[#0000001F] rounded-[8px] w-[192px] min-h-[52px] font-bold text-[18px] transition-all duration-300 ease-in-out cursor-pointer">
            {/* <Company className="text-[#0866FF] group-hover:text-white" /> */}
            <span className="text-[#000000] group-hover:text-white">
              ბიზნესი
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionBottomSide;
