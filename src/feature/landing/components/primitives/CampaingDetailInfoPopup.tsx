import React from 'react';

const CampaingDetailInfoPopup = () => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-[#ffffff] px-[26px] py-[34px] rounded-[8px] w-full max-w-[954px] min-h-[715px]">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-[20px]">
                კამპანიის ანალიტიკა:<span>აქ კამპანიის სახელი</span>
              </p>
              <p className="text-[#000000AD] text-[14px]">
                დეტალური პერფონმანსი
              </p>
            </div>
            <div className="flex gap-[16px] w-full max-w-[285px]">
              <button className="bg-[#0866FF14] px-[22px] py-[6px] border border-[#0866FF1A] rounded-[8px] font-semibold text-[#0866FF] text-[13px] cursor-pointer">
                გახსენი ჩატი
              </button>
              <button className="bg-[#0866FFDB] border border-[#C13D3F36] rounded-[8px] w-full max-w-[135px] min-h-[30px] font-semibold text-[#FFFFFF] text-[13px] cursor-pointer">
                გახსენი ჩატი
              </button>
            </div>
          </div>
        </div>
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
                <p className="font-semibold text-[#111827] text-[28px]">
                  15,000
                </p>
              </div>
              <p className="font-medium text-[14px]">ჯამური ნახვები</p>
            </div>
          </div>
          <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
            <div>
              <div>
                <p className="font-semibold text-[#111827] text-[28px]">
                  15,000
                </p>
              </div>
              <p className="font-medium text-[14px]">გამოქვეყნებული ვიდეო</p>
            </div>
          </div>
          <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
            <div>
              <div>
                <p className="font-semibold text-[#111827] text-[28px]">
                  28.00
                </p>
              </div>
              <p className="font-medium text-[14px]">საშუალოდ 1K ნახვაზე</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaingDetailInfoPopup;
