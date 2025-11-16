'use client';
import Link from 'next/link';
import { BusinessCreatorBtnSliderProps } from '../../type';

const BusinessCreatorBtnSlider = ({
  setRegistrationType,
  registrationType,
}: BusinessCreatorBtnSliderProps) => {
  return (
    <div className="flex justify-between bg-[var(--auth-buttonSlider-bg)] mt-[37px] px-[7px] py-[6px] rounded-[8px] w-full min-h-[56px]">
      <Link
        onClick={() => setRegistrationType('business')}
        href={'/registrationBussines?type=business'}
        className={`w-1/2 font-bold text-[var(--auth-text-dark)] text-[18px] flex items-center justify-center cursor-pointer rounded-[8px] ${
          registrationType === 'business' ? 'bg-[var(--white-color)]' : ''
        }`}
      >
        ბიზნესი
      </Link>

      <button
        onClick={() => setRegistrationType('creator')}
        className={`w-1/2 font-bold text-[var(--auth-text-dark)] text-[18px] cursor-pointer rounded-[8px] ${
          registrationType === 'creator' ? 'bg-[var(--white-color)]' : ''
        }`}
      >
        შემქმნელი
      </button>
    </div>
  );
};

export default BusinessCreatorBtnSlider;
