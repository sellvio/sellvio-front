import React from 'react';

const CampaignDetailStats = () => {
  return (
    <div className="flex gap-[18px] mt-[16px] w-full">
      <div className="bg-[#00000005] px-[24px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#00D540] text-[28px]">420</p>
          </div>
          <p className="font-medium text-[14px]">ჯამური შემოსავალი</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#111827] text-[28px]">15,000</p>
          </div>
          <p className="font-medium text-[14px]">ჯამური ნახვები</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#111827] text-[28px]">15,000</p>
          </div>
          <p className="font-medium text-[14px]">გამოქვეყნებული ვიდეო</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#3012B3CC] text-[28px]">28.00</p>
          </div>
          <p className="font-medium text-[14px]">საშუალოდ 1K ნახვაზე</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailStats;
