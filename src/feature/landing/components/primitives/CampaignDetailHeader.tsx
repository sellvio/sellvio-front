import React from 'react';

const CampaignDetailHeader = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-[20px]">
            კამპანიის ანალიტიკა:<span>აქ კამპანიის სახელი</span>
          </p>
          <p className="text-[#000000AD] text-[14px]">დეტალური პერფონმანსი</p>
        </div>
        <div className="flex gap-[16px] w-full max-w-[285px]">
          <button className="bg-[#0866FF14] px-[22px] py-[6px] border border-[#0866FF1A] rounded-[8px] font-semibold text-[#0866FF] text-[13px] cursor-pointer">
            გახსენი ჩატი
          </button>
          <button className="bg-[#0866FFDB] border border-[#C13D3F36] rounded-[8px] w-full max-w-[135px] min-h-[30px] font-semibold text-[#FFFFFF] text-[13px] cursor-pointer">
            დაამატე URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailHeader;
