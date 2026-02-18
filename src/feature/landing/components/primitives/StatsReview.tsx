import Image from 'next/image';
const StatsReview = () => {
  return (
    <div className="flex gap-[18px] mt-[17px] w-full">
      <div className="bg-[#00000005] px-[24px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div className="flex gap-[3px]">
            <p className="font-semibold text-[#111827] text-[28px]">8,500</p>
          </div>
          <p className="font-medium text-[14px]">ნახვები</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#EB1654] text-[28px]">15,000</p>
          </div>
          <p className="font-medium text-[14px]">მოწონება</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#00D540] text-[28px]">23</p>
          </div>
          <p className="font-medium text-[14px]">გაზიარება</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div className="flex gap-[3px]">
            <Image
              src="/images/CampaingPopupImages/svg/dollar-purple.svg"
              alt="dollar"
              width={15}
              height={38}
            />
            <p className="font-semibold text-[#3012B3CC] text-[28px]">288</p>
          </div>
          <p className="font-medium text-[14px]">გამომუშავება</p>
        </div>
      </div>
    </div>
  );
};

export default StatsReview;
