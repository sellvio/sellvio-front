import StatsReview from './StatsReview';
import VideoReview from './VideoReview';

const ReusableReview = () => {
  return (
    <div className="w-full">
      <p className="font-semibold text-[20px]">TikTok მაჩვენებლები</p>
      <StatsReview />
      <div className="flex gap-[10px] mt-[17px] w-full">
        <div className="px-[32px] py-[28px] border border-[#0000001F] rounded-[8px] w-full max-w-1/2 min-h-[223px]">
          <p className="font-semibold">ჩართულობის მაჩვენებლები</p>
          <div className="flex flex-col gap-[27px] mt-[24px] w-full">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#000000AD] text-[14px]">
                ჩართულობის მაჩვენებელი
              </p>
              <p className="font-semibold text-[#0866FF] text-[14px]">
                6.7 <span>%</span>
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#000000AD] text-[14px]">კომენტარები</p>
              <p className="font-semibold text-[#111827] text-[14px]">89</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#000000AD] text-[14px]">
                საუკეთესო გამოქვეყნების დრო
              </p>
              <p className="font-semibold text-[#583CCF] text-[14px]">
                7-9 <span>PM</span>
              </p>
            </div>
          </div>
        </div>
        <VideoReview />
      </div>
    </div>
  );
};

export default ReusableReview;
