"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "./ProgressDash";
import { fetchMyCampaigns } from "@/lib/api/BusinessCards";
import { BusinessCampaign } from "@/feature/landing/type";

const statusLabels: Record<string, string> = {
  active: "აქტიური",
  draft: "დაუსრულებელი",
  paused: "შეჩერებული",
  completed: "დასრულებული",
  cancelled: "გაუქმებული",
};

const Companys = () => {
  const { data, isLoading, isError } = useQuery<BusinessCampaign[]>({
    queryKey: ["myCampaigns"],
    queryFn: fetchMyCampaigns,
  });

  const campaigns = data ?? [];

  return (
    <div className="flex flex-wrap gap-6 max-w-[1387px] w-full mx-auto">
      <div className="flex justify-between items-center max-w-[1408px] w-full mx-auto px-[15px]">
        <h2 className="text-[24px] font-bold text-[var(--black-color)]">
          შენი კამპანიები
        </h2>
        <div>
          <Link
            href="/campaingForm"
            className="bg-[var(--button-bg)] w-[229px] py-3 px-2 border cursor-pointer text-[14px] flex items-center gap-2 text-[var(--white-color)] rounded-[8px]"
          >
            <Image
              src="/images/svg/plus.svg"
              width={30}
              height={30}
              alt="icon"
            />
            დაიწყე ახალი კამპანია
          </Link>
        </div>
      </div>

      {isLoading && (
        <p className="w-full px-[15px] text-[var(--buisness-card-info)]">
          იტვირთება...
        </p>
      )}
      {isError && (
        <p className="w-full px-[15px] text-[var(--buisness-card-info)]">
          კამპანიების ჩატვირთვა ვერ მოხერხდა
        </p>
      )}
      {!isLoading && !isError && campaigns.length === 0 && (
        <p className="w-full px-[15px] text-[var(--buisness-card-info)]">
          ჯერ არ გაქვს კამპანიები
        </p>
      )}

      <div className="flex flex-wrap gap-4 max-w-[1387px]  justify-center ">
        {campaigns.map((campaign) => {
          const budget = Number(campaign.budget);
          const spent = Number(
            campaign.campaign_budget_tracking?.[0]?.spent_amount ?? 0
          );

          return (
            <div
              key={campaign.id}
              className="max-w-[446px] bg-transparent rounded-[8px] border border-[var(--buisness-cards-border)] flex flex-col relative"
            >
              <div className="relative">
                <Image
                  src={campaign.campaign_image_url || "/images/png/pictureBg.png"}
                  width={446}
                  height={244}
                  alt="bg"
                  unoptimized
                  className="rounded-t-[8px] w-[446px] h-[244px] object-cover"
                />
                <div
                  className={`absolute top-[19px] left-[19px] rounded-3xl px-3 py-2 font-semibold text-[10px] text-[var(--white-color)] ${
                    campaign.status === "active"
                      ? "bg-[var(--buisness-active)]"
                      : "bg-[var(--buisness-uncomplited)]"
                  }`}
                >
                  {statusLabels[campaign.status] ?? campaign.status}
                </div>

                <div className="absolute bottom-[22px] left-[19px]">
                  <p className="text-[18px] font-[700] text-[var(--white-color)] drop-shadow-md">
                    {campaign.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col px-[22px] mt-4 flex-1">
                <div className="flex justify-between max-w-[319px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/svg/created.svg"
                      width={16}
                      height={16}
                      alt="created"
                    />
                    <div className="flex items-center gap-3">
                      <p className="text-[var(--buisness-card-info)] font-medium flex gap-2">
                        <span>
                          {campaign._count.campaign_videos.toLocaleString()}
                        </span>
                        შექმნილი
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/svg/creators.svg"
                      width={16}
                      height={16}
                      alt="participants"
                    />
                    <p className="text-[var(--buisness-card-info)]  font-medium">
                      <span>
                        {campaign._count.campaign_participants.toLocaleString()}
                      </span>{" "}
                      მონაწილე
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-[13px] text-[14px] text-[var(--buisness-card-info)] ">
                  <p className="font-medium">ბიუჯეტი</p>
                  <p className="font-[600] text-[var(--buisness-card-info)]">
                    ₾{spent.toLocaleString()} / ₾{budget.toLocaleString()}
                  </p>
                </div>
                <ProgressBar currentAmount={spent} goalAmount={budget || 1} />

                <div className="flex justify-between items-center text-[var(--buisness-card-info)] font-medium">
                  <p>ჯამური გადახდა</p>
                  <p className="text-[var(--total-payment)] font-semibold">
                    ₾{spent.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3 mt-4 mb-[18px]">
                  <Link
                    href={`/analytic?campaignId=${campaign.id}`}
                    className="w-[259px] py-3 bg-transparent rounded-[8px] border border-[var(--buisness-cards-border)] text-[var(--buisness-card-info)] font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Image
                      src="/images/svg/analytic.svg"
                      width={18}
                      height={18}
                      alt="analytic"
                    />
                    ანალიტიკა
                  </Link>
                  <Link
                    href={`/chat?campaignId=${campaign.id}`}
                    className="w-[133px] py-3 bg-transparent rounded-[8px] border border-[var(--buisness-cards-border)] text-[var(--buisness-card-info)] font-bold flex items-center justify-center text-[15px] cursor-pointer"
                  >
                    გახსენი ჩატი
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Companys;
