'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BussinesCreatorBtnSliderProps } from '../../type';

const BussinesCreatorBtnSlider = ({
  creatorAuth,
  bussinesAuth,
}: BussinesCreatorBtnSliderProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get('type');

  const [registrationType, setRegistrationType] = useState<
    'bussines' | 'creator'
  >(typeParam === 'creator' ? 'creator' : 'bussines');

  const handleClick = (type: 'bussines' | 'creator') => {
    setRegistrationType(type);
    const url =
      type === 'creator'
        ? creatorAuth + '?type=creator'
        : bussinesAuth + '?type=bussines';
    router.replace(url);
  };

  return (
    <div className="flex justify-between bg-[var(--auth-buttonSlider-bg)] mt-[37px] px-[7px] py-[6px] rounded-[8px] w-full min-h-[56px]">
      <button
        onClick={() => handleClick('bussines')}
        className={`w-1/2 font-bold text-[var(--auth-text-dark)] text-[18px] cursor-pointer rounded-[8px] ${
          registrationType === 'bussines' ? 'bg-[var(--white-color)]' : ''
        }`}
      >
        ბიზნესი
      </button>
      <button
        onClick={() => handleClick('creator')}
        className={`w-1/2 font-bold text-[var(--auth-text-dark)] text-[18px] cursor-pointer rounded-[8px] ${
          registrationType === 'creator' ? 'bg-[var(--white-color)]' : ''
        }`}
      >
        შემქმნელი
      </button>
    </div>
  );
};

export default BussinesCreatorBtnSlider;
