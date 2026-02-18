import Image from 'next/image';

const Review = () => {
  return (
    <div className="flex flex-col w-full">
      <p className="font-semibold text-[20px]">ვიდეოს მაჩვენებლები</p>
      <div className="flex flex-col gap-[10px] gap-[17px] mt-[17px] px-[32px] py-[28px] border border-[#0000001F] rounded-[8px] w-full max-w-1/2">
        <div className="w-full">
          <div className="space-y-[7px] w-full">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-[6px]">
                <Image
                  src={'/images/CampaingPopupImages/svg/play-button.svg'}
                  alt="playButton"
                  width={15}
                  height={15}
                />
                <p className="font-semibold">ვიდეოს მაჩვენებლები</p>
              </div>
              <div className="flex justify-center items-center border border-[#0000001F] rounded-[12px] w-[52px] h-[22px]">
                <p className="font-semibold text-[#111827] text-[13px]">$240</p>
              </div>
            </div>
            <p className="text-[#000000AD] text-[14px]">
              TikTok ატვირთულია <span>2025.07.22</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[17px] w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-[10px] w-full max-w-[163px]">
              <Image
                src={'/images/CampaingPopupImages/svg/eye.svg'}
                alt="playButton"
                width={15}
                height={15}
              />
              <div className="space-y-[3px]">
                <p className="font-semibold text-[15px]">45,500</p>
                <p className="text-[#000000AD] text-[15px]">ნახვები</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px] w-full max-w-[163px]">
              <Image
                src={'/images/CampaingPopupImages/svg/heart.svg'}
                alt="playButton"
                width={15}
                height={15}
              />
              <div className="space-y-[3px]">
                <p className="font-semibold text-[15px]">45,500</p>
                <p className="text-[#000000AD] text-[15px]">ლაიქები</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-[10px] w-full max-w-[163px]">
              <Image
                src={'/images/CampaingPopupImages/svg/share.svg'}
                alt="playButton"
                width={15}
                height={15}
              />
              <div className="space-y-[3px]">
                <p className="font-semibold text-[15px]">45,500</p>
                <p className="text-[#000000AD] text-[15px]">გაზიარება</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px] w-full max-w-[163px]">
              <Image
                src={'/images/CampaingPopupImages/svg/dollar-sign.svg'}
                alt="playButton"
                width={15}
                height={15}
              />
              <div className="space-y-[3px]">
                <p className="font-semibold text-[15px]">45,500</p>
                <p className="text-[#000000AD] text-[15px]">გამომუშავებული</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
