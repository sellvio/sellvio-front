'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BussinesCreatorBtnSlider = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const [registrationType, setRegistrationType] = useState<
    'bussines' | 'creator'
  >('bussines');

  useEffect(() => {
    if (type === 'creator') setRegistrationType('creator');
    else setRegistrationType('bussines');
  }, [type]);

  return (
    <div className="flex justify-between bg-[#F2F5F9] mt-[37px] px-[7px] py-[6px] rounded-[8px] w-full min-h-[56px]">
      <button
        onClick={() => setRegistrationType('bussines')}
        className={`w-1/2 font-bold text-[#000000D4] text-[18px] cursor-pointer rounded-[8px] ${
          registrationType === 'bussines' && 'bg-white'
        }`}
      >
        ბიზნესი
      </button>
      <button
        onClick={() => setRegistrationType('creator')}
        className={`w-1/2 font-bold text-[#000000D4] cursor-pointer text-[18px] rounded-[8px] ${
          registrationType === 'creator' && 'bg-white'
        }`}
      >
        შემქმნელი
      </button>
    </div>
  );
};

export default BussinesCreatorBtnSlider;
