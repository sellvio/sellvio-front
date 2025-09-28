import Image from "next/image";
import { platformPerformance } from "../../data/data";

const PlatformPerformance = () => {
  return (
    <div className="flex flex-col lg:max-w-[1440px] lg:w-full  flex-wrap gap-[26px] px-[15px] mx-auto">
      <div className="flex gap-2 items-center mb-[26px] pl-[11px]">
        <Image
          src="/images/performanceCardIcons/svg/trending-up.svg"
          width={20}
          height={20}
          alt="trending"
        />
        <h3 className="font-[600] text-[22px]   ">პლათფორმის პერფორმანსი</h3>
      </div>

      <div className="lg:max-w-[1440px] lg:w-full flex flex-wrap justify-center gap-[26px] mx-auto">
        {platformPerformance.map((eachElement) => (
          <div
            key={eachElement.id}
            className=" rounded-[8px] border border-[var(--lending-border)] max-w-[445px] w-full min-h-[323px] px-[29px] py-[31px]"
          >
            <p className="text-[18px] font-[600]">{eachElement.title}</p>
            <div className="flex flex-col gap-[21px]">
              <div className="w-full flex justify-between items-center mt-[30px]">
                <div className="flex items-center  max-w-[163px] w-full gap-2">
                  <Image
                    src={eachElement.viewerIcon}
                    width={15}
                    height={15}
                    alt="eyes"
                  />
                  <div>
                    <p className="font-[600] text-[15px]">
                      {eachElement.views}
                    </p>
                    <p className="text-[var(--campaing-form-paragraphs)] text-[15px]">
                      {eachElement.view}
                    </p>
                  </div>
                </div>
                <div className="flex items-center max-w-[163px] w-full gap-2 ">
                  <Image
                    src={eachElement.likeIcon}
                    width={15}
                    height={15}
                    alt="likes"
                  />
                  <div>
                    <p className="font-[600] text-[15px]">
                      {eachElement.likes}
                    </p>
                    <p className="text-[var(--campaing-form-paragraphs)] text-[15px]">
                      {eachElement.like}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex justify-between items-center">
                <div className="flex items-center max-w-[163px] w-full gap-2">
                  <Image
                    src={eachElement.shareIcon}
                    width={15}
                    height={15}
                    alt="share"
                  />
                  <div>
                    <p className="font-[600] text-[15px]">
                      {eachElement.shares}
                    </p>
                    <p>{eachElement.share}</p>
                  </div>
                </div>
                <div className="flex items-center max-w-[163px] w-full gap-2">
                  <Image
                    src={eachElement.percent}
                    width={15}
                    height={15}
                    alt="percent"
                  />
                  <div>
                    <p className="text-[var(--total-payment)] font-[600]">
                      % {eachElement.earns}
                    </p>
                    <p>{eachElement.earn}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[389px] h-[1] bg-[var(--performance-card-line)] my-[21px] mx-auto"></div>
            <div className="flex flex-col gap-[6px]">
              <p className="text-[var(--campaing-form-paragraphs)]">
                {eachElement.favoriteVideo}
              </p>
              <p className="font-[500]">{eachElement.videoname}</p>
              <p className="text-[var(--campaing-form-paragraphs)]">
                {eachElement.videoView}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformPerformance;
