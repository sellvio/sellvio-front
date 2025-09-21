'use client';
import { useState } from 'react';
import ButtonSlider from '../primitives/ButtonSlider';
import Image from 'next/image';
import { businessCreatorData } from '../../data/businessCreatorData';

const BusinessCreatorCards = () => {
  const [active, setActive] = useState<'business' | 'creator'>('business');

  const businessAndCreator =
    active === 'business'
      ? businessCreatorData.business
      : businessCreatorData.creator;

  return (
    <div
      id="howtowork"
      className="flex flex-col items-center space-y-[28px] m-auto mt-[71px] px-[10px] w-full"
    >
      <p className="font-medium text-[32px] text-center">როგორ მუშაობს</p>
      <ButtonSlider active={active} setActive={setActive} />
      <div className="flex flex-wrap justify-center gap-[13px] w-full max-w-[1380px]">
        {businessAndCreator.map((eachElement) => (
          <div
            key={eachElement.id}
            className="flex flex-col items-center gap-[15px] px-[15px] pt-[37px] pb-[15px] rounded-[8px] w-full max-w-[335px] min-h-[280px]"
            style={{
              background: 'linear-gradient(0deg, #3012B3 0%, #7B62E8 100%)',
            }}
          >
            <div className="flex justify-center items-center bg-[#FFFFFF1F] rounded-full w-[60px] h-[60px] shrink-0">
              <Image
                src={eachElement.icon}
                alt={eachElement.alt}
                width={22}
                height={22}
              />
            </div>
            <div className="space-y-[18px] w-full max-w-[305px]">
              <p className="font-medium text-[#FFFFFF] text-[18px] text-center">
                {eachElement.title}
              </p>
              <p className="font-medium text-[#B3B3B3] text-[12px] text-center">
                {eachElement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCreatorCards;
