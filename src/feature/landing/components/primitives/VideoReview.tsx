import Image from 'next/image';

const VideoReview = () => {
  return (
    <div className="px-[32px] py-[28px] border border-[#0000001F] rounded-[8px] w-full max-w-1/2 min-h-[223px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold">ვიდეოს მაჩვენებლები</p>
        <div className="flex justify-center items-center bg-[#0866FF0A] px-[10px] py-[6px] border border-[#0000001F] rounded-[15px] w-full max-w-[115px] cursor-pointer">
          <p className="font-semibold text-[10px]">ყველას მონიშვნა</p>
        </div>
      </div>
      <div className="flex justify-between bg-[#11182714] mt-[36px] p-[10px] border border-[#0866FF14] rounded-[4px] w-full min-h-[61px]">
        <div>
          <p className="font-semibold text-[#111827] text-[14px]">
            ვიდეოს დასახელება
          </p>
          <p className="text-[#000000AD] text-[14px]">2024.01.15</p>
        </div>
        <div className="flex gap-[27px]">
          <div>
            <p className="w-full font-semibold text-[#111827] text-[14px] text-end">
              $234
            </p>
            <p className="text-[#000000AD] text-[14px]">
              8,500 <span>ნახვა</span>
            </p>
          </div>
          <div className="flex justify-center items-center bg-[#5E5E5E] rounded-[8px] w-[40px] min-h-[40px]">
            <Image
              src="/images/CampaingPopupImages/svg/video-play-button.svg"
              alt="verified"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoReview;
