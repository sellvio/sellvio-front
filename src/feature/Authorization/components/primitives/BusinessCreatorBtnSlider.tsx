'use client';
import { BussinesCreatorBtnSliderProps } from '../../type';

const BusinessCreatorBtnSlider = ({
  setRegistrationType,
  registrationType,
}: BussinesCreatorBtnSliderProps) => {
  return (
    <div className="flex justify-between bg-[var(--auth-buttonSlider-bg)] mt-[37px] px-[7px] py-[6px] rounded-[8px] w-full min-h-[56px]">
      <button
        onClick={() => setRegistrationType('bussines')}
        className={`w-1/2 font-bold text-[var(--auth-text-dark)] text-[18px] cursor-pointer rounded-[8px] ${
          registrationType === 'bussines' ? 'bg-[var(--white-color)]' : ''
        }`}
      >
        ბიზნესი
      </button>
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
