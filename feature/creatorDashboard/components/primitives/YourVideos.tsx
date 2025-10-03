import Image from "next/image";

const YourVideos = () => {
  return (
    <div className="max-w-[1440px] w-full mx-auto">
      <div className="max-w-[680px] min-h-[287px] bg-[aqua]">
        <div className="flex items-center gap-1 w-full bg-[yellow]">
          <div className="w-[31px] h-[31px] rounded-[50px] bg-[#D9D9D9]"></div>
          <div className="">
            <p className="font-[600] text-[14px]">მარიამი_200000</p>
            <p className="text-[14px] text-[#000000AD]">კამპინგის შემქმნელი</p>
          </div>
        </div>
        <div className="w-full min-h-[227px]">
          <div>{/* ვიდეო */}</div>
          <div className="max-w-[455px] min-h-[142px] flex flex-col">
            <h3 className="font-[600] text-[14px]">
              ოკეანეში ქორწილის ინიციატივა
            </h3>
            <p className="text-[#000000AD] text-[14px]">
              გემით გასეირნება ოკეანეში სადაც გაიმართება დაუვიწყარი წვეულებები
              და ღონისძიებები.
            </p>
          </div>
          <div>
            <Image
              src="/images/creatorDashboard/svg/creatorProfileCalendar.svg"
              width={14}
              height={14}
              alt="calendar"
            />
            <p>გამოქვეყნდა: 24 აგვისტო 2025,12:46</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourVideos;
