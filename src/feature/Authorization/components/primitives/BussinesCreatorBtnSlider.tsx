'use client';
import { useState } from 'react';

const BussinesCreatorBtnSlider = () => {
  const [bussinesCretor, setBussinesCreator] = useState('creator');

  return (
    <div className="flex justify-between bg-[#F2F5F9] mt-[37px] px-[7px] py-[6px] rounded-[8px] w-full min-h-[56px]">
      <button
        onClick={() => setBussinesCreator('bussiness')}
        className={`w-1/2 font-bold text-[#000000D4] text-[18px] cursor-pointer rounded-[8px] ${
          bussinesCretor === 'bussiness' && 'bg-white'
        }`}
      >
        ბიზნესი
      </button>
      <button
        onClick={() => setBussinesCreator('creator')}
        className={`w-1/2 font-bold text-[#000000D4] cursor-pointer text-[18px] rounded-[8px] ${
          bussinesCretor === 'creator' && 'bg-white'
        }`}
      >
        შემქმნელი
      </button>
    </div>
  );
};

export default BussinesCreatorBtnSlider;
