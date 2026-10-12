import Image from "next/image";
import { AnalyticsTotals, PlatformName } from "@/lib/api/analytics";
import { performanceIcons, platformPerformance } from "../../data/data";

export type BestVideo = { title: string; views: number };

type PlatformPerformanceProps = {
  byPlatform: Partial<Record<PlatformName, AnalyticsTotals>>;
  // Only available for a single campaign (per-video analytics)
  bestVideos?: Partial<Record<PlatformName, BestVideo>>;
};

const engagementRate = (totals?: AnalyticsTotals) => {
  if (!totals || !totals.views) return 0;
  const interactions = totals.likes + totals.comments + totals.shares;
  return Math.round((interactions / totals.views) * 1000) / 10;
};

const PlatformPerformance = ({
  byPlatform,
  bestVideos,
}: PlatformPerformanceProps) => {
  return (
    <div className="flex flex-col lg:max-w-[1440px] lg:w-full  flex-wrap gap-[26px] px-[15px] mx-auto">
      <div className="flex gap-2 items-center mb-[26px] pl-[11px]">
        <Image
          src="/images/performanceCardIcons/svg/trending-up.svg"
          width={20}
          height={20}
          alt="trending"
        />
        <h3 className="font-[600] text-[22px]">პლატფორმის პერფორმანსი</h3>
      </div>

      <div className="lg:max-w-[1440px] lg:w-full flex flex-wrap justify-center gap-[26px] mx-auto">
        {platformPerformance.map((eachElement) => {
          const totals = byPlatform[eachElement.platform];
          const best = bestVideos?.[eachElement.platform];
          return (
          <div
            key={eachElement.id}
            className=" rounded-[8px] border border-[var(--lending-border)] max-w-[445px] w-full min-h-[323px] px-[29px] py-[31px]"
          >
            <p className="text-[18px] font-[600]">{eachElement.title}</p>
            <div className="flex flex-col gap-[21px]">
              <div className="w-full flex justify-between items-center mt-[30px]">
                <div className="flex items-center  max-w-[163px] w-full gap-2">
                  <Image
                    src={performanceIcons.viewerIcon}
                    width={15}
                    height={15}
                    alt="eyes"
                  />
                  <div>
                    <p className="font-[600] text-[15px]">
                      {(totals?.views ?? 0).toLocaleString()}
                    </p>
                    <p className="text-[var(--campaing-form-paragraphs)] text-[15px]">
                      ნახვები
                    </p>
                  </div>
                </div>
                <div className="flex items-center max-w-[163px] w-full gap-2 ">
                  <Image
                    src={performanceIcons.likeIcon}
                    width={15}
                    height={15}
                    alt="likes"
                  />
                  <div>
                    <p className="font-[600] text-[15px]">
                      {(totals?.likes ?? 0).toLocaleString()}
                    </p>
                    <p className="text-[var(--campaing-form-paragraphs)] text-[15px]">
                      ლაიქები
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex justify-between items-center">
                <div className="flex items-center max-w-[163px] w-full gap-2">
                  <Image
                    src={performanceIcons.shareIcon}
                    width={15}
                    height={15}
                    alt="share"
                  />
                  <div>
                    <p className="font-[600] text-[15px]">
                      {(totals?.shares ?? 0).toLocaleString()}
                    </p>
                    <p>გაზიარება</p>
                  </div>
                </div>
                <div className="flex items-center max-w-[163px] w-full gap-2">
                  <Image
                    src={performanceIcons.percent}
                    width={15}
                    height={15}
                    alt="percent"
                  />
                  <div>
                    <p className="text-[var(--total-payment)] font-[600]">
                      {engagementRate(totals)}%
                    </p>
                    <p>ჩართულობა</p>
                  </div>
                </div>
              </div>
            </div>
            {bestVideos && (
              <>
                <div className="max-w-[389px] h-[1px] bg-[var(--performance-card-line)] my-[21px] mx-auto"></div>
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[var(--campaing-form-paragraphs)]">
                    საუკეთესო ვიდეო
                  </p>
                  {best ? (
                    <>
                      <p className="font-[500]">{best.title}</p>
                      <p className="text-[var(--campaing-form-paragraphs)]">
                        {best.views.toLocaleString()} ნახვა
                      </p>
                    </>
                  ) : (
                    <p className="text-[var(--campaing-form-paragraphs)]">
                      ჯერ არ არის მონაცემები
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformPerformance;
