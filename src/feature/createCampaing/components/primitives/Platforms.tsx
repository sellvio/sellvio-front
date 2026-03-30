'use client';

import Image from 'next/image';
import { Socmedia } from '../../../../../feature/createCampaing/data/data';

const Platforms = () => {
  return (
    <div className="flex flex-col gap-[26px] bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border border-[var(--createCampaing-border)] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/platforms.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px] text-[var(--black-color)]">
            აირჩიე პლატფორმები
          </h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          აირჩიე რომელ პლატფორმებზე გსურთ ამ კამპანიის მიზნობრივი გამოყენება
        </p>
      </div>

      <div className="flex gap-[87px] mt-[26px] w-full">
        {Socmedia?.map((eachelement) => (
          <div
            key={eachelement.id}
            className="flex flex-col justify-center items-center gap-[17px] bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] lg:mx-auto border border-[#FFFFFF] rounded-[8px] outline-none w-full h-[111px] transition-colors cursor-pointer"
          >
            <Image
              src={eachelement.img}
              width={36}
              height={36}
              alt={eachelement.title}
            />
            <span className="font-[600] text-[var(--black-color)]">
              {eachelement.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platforms;
