"use client";
import Image from "next/image";
import ToggleButtons from "@/components/ToggleButtons";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CreatorCampaign,
  CreatorVideo,
  fetchCreatorCampaigns,
  fetchCreatorVideos,
} from "@/lib/api/creator";
import StateMessage from "../../../components/StateMessage";
import AddSocialPostForm from "./AddSocialPostForm";

type Tab = "analytic" | "campaing";

type VideoCardsProps = {
  // "analytic" = campaigns tab, "campaing" = submitted videos tab
  defaultTab?: Tab;
};

const participationStatus: Record<
  string,
  { label: string; image: string; className: string }
> = {
  approved: {
    label: "გაწევრიანებული",
    image: "/images/creatorVideos/svg/done.svg",
    className: "bg-[var(--videos-status-green)] text-[var(--total-payment)]",
  },
  pending: {
    label: "მომლოდინეთა სიაში",
    image: "/images/creatorVideos/svg/pending.svg",
    className: "bg-[#FFFFFF57] text-[var(--videos-status-pending)]",
  },
  rejected: {
    label: "უარყოფილი",
    image: "/images/creatorVideos/svg/rejected.svg",
    className:
      "bg-[var(--videos-status-rejected)] text-[var(--videos-status-rejected-text)]",
  },
};

const videoStatus: Record<string, { label: string; className: string }> = {
  approved: { label: "დადასტურებული", className: "bg-[#C4F7C14F] text-[#16A34A]" },
  rejected: { label: "უარყოფილია", className: "bg-[#C13D3F4F] text-[#EB1654]" },
  under_review: { label: "განხილვაში", className: "bg-[#0866FF14] text-[#0866FF]" },
};

const paymentTypeLabels: Record<string, string> = {
  cost_per_view: "ნახვაზე",
  cost_per_click: "დაკლიკებაზე",
  cost_per_engagement: "ჩართულობაზე",
  cost_per_reach: "მიღწევაზე",
};

const formatDate = (value: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("ka-GE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CampaignCard = ({ item }: { item: CreatorCampaign }) => {
  const status =
    participationStatus[item.participationStatus ?? "pending"] ??
    participationStatus.pending;

  return (
    <div className="max-w-[446px] w-full bg-transparent rounded-[8px] min-h-[402px] border border-[var(--buisness-cards-border)] flex flex-col relative gap-5">
      <div className="relative">
        <Image
          src="/images/png/pictureBg.png"
          width={446}
          height={244}
          alt="bg"
          className="rounded-t-[8px]"
        />

        <div className="absolute top-[19px] left-[19px] flex items-center gap-[6px]">
          <Image src={status.image} alt={status.label} width={18} height={18} />
          <div
            className={`rounded-3xl px-3 py-2 font-semibold text-[10px] ${status.className}`}
          >
            {status.label}
          </div>
        </div>

        <div className="absolute bottom-[22px] left-[19px]">
          <p className="text-[18px] font-[700] text-[var(--white-color)] drop-shadow-md">
            {item.campaign.name}
          </p>
          <p className="text-[14px] font-[500] text-[var(--videos-card-paragraph)] drop-shadow-md">
            ₾{Number(item.campaign.paymentAmount ?? 0).toLocaleString()}{" "}
            {paymentTypeLabels[item.campaign.paymentType] ?? ""}
          </p>
        </div>
      </div>

      <div className="flex flex-col px-[22px] flex-1 gap-3">
        <div className="flex justify-between max-w-[319px]">
          <div className="flex items-center gap-2">
            <Image src="/images/svg/eye.svg" width={16} height={16} alt="views" />
            <p className="text-[var(--buisness-card-info)] font-medium">
              <span>{item.analytics.totals.views.toLocaleString()}</span> ნახვა
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/images/svg/created.svg"
              width={16}
              height={16}
              alt="created"
            />
            <p className="text-[var(--buisness-card-info)] font-medium flex gap-2">
              <span>{item.videos.total.toLocaleString()}</span>
              ვიდეო
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#11182742]"></div>

        <div className="flex justify-between items-center text-[var(--buisness-card-info)] font-medium">
          <p>ჯამური გამომუშავება</p>
          <p className="text-[var(--total-payment)] font-semibold">
            ₾{Number(item.analytics.earnings ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3 mt-4 mb-[18px]">
          {item.participationStatus === "approved" ? (
            <Link
              href={`/chat?campaignId=${item.campaign.id}`}
              className="w-full py-3 bg-transparent rounded-[8px] border border-[var(--buisness-cards-border)] text-[var(--buisness-card-info)] font-bold flex items-center justify-center text-[15px] cursor-pointer"
            >
              გახსენი ჩატი
            </Link>
          ) : (
            <p className="w-full py-3 text-center text-[14px] text-[var(--buisness-card-info)]">
              ჩატი ხელმისაწვდომი გახდება დადასტურების შემდეგ
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ item }: { item: CreatorVideo }) => {
  const [isAddingUrl, setAddingUrl] = useState(false);
  const status =
    videoStatus[item.status ?? "under_review"] ?? videoStatus.under_review;

  return (
    <div className="max-w-[680px] w-full min-h-[287px] border border-[#E3E3E3] rounded-[10px]">
      <div className="flex items-center gap-1 w-full bg-[#0866FF0A] py-3 pl-[25px]">
        <div className="w-[31px] h-[31px] rounded-[50px] bg-[#D9D9D9]" />
        <div>
          <p className="font-[600] text-[14px]">{item.campaign.name}</p>
          <p className="text-[14px] text-[#000000AD]">კამპანია</p>
        </div>
      </div>

      <div className="w-full flex gap-4 justify-center mt-[20px] mb-[20px] px-[20px]">
        <div className="shrink-0">
          <Image
            src={item.coverUrl || "/images/creatorDashboard/png/videoFrames.png"}
            width={156}
            height={150}
            alt="video"
            unoptimized
            className="rounded-[8px] object-cover w-[156px] h-[150px]"
          />
        </div>

        <div className="max-w-[455px] w-full min-h-[142px] flex flex-col justify-between">
          <div>
            <h3 className="font-[600] text-[14px]">{item.title}</h3>
            {item.socialPosts.length > 0 && (
              <div className="flex flex-col gap-1 mt-1">
                {item.socialPosts.map((post) =>
                  post.post_url ? (
                    <a
                      key={post.id}
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0866FF] text-[13px] truncate"
                    >
                      {post.platform}: {post.post_url}
                    </a>
                  ) : null
                )}
              </div>
            )}
            <div className="flex items-center gap-1 mt-[18px]">
              <Image
                src="/images/creatorDashboard/svg/creatorProfileCalendar.svg"
                width={14}
                height={14}
                alt="calendar"
              />
              <p className="text-[13px]">
                გამოქვეყნდა: {formatDate(item.submittedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-[12px] flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <p>სტატუსი:</p>
              <div
                className={`w-[80px] h-[24px] text-[9px] flex justify-center items-center rounded-[11px] ${status.className}`}
              >
                {status.label}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/chat?campaignId=${item.campaign.id}`}
                className="w-[125px] py-[5px] bg-[#0866FF14] text-[#0866FF] rounded-[8px] flex justify-center cursor-pointer"
              >
                გახსენი ჩატი
              </Link>
              <button
                type="button"
                onClick={() => setAddingUrl((prev) => !prev)}
                className="w-[125px] py-[5px] bg-[#0866FFDB] text-[#ffffff] rounded-[8px] flex justify-center cursor-pointer"
              >
                დაამატე URL
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAddingUrl && (
        <AddSocialPostForm videoId={item.id} onDone={() => setAddingUrl(false)} />
      )}

      <div className="w-full flex items-center justify-between border-t border-[#E3E3E3] bg-[#0866FF0A] text-[14px] px-[20px] py-[12px]">
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-1">
            <Image
              src="/images/creatorDashboard/svg/eye.svg"
              width={14}
              height={14}
              alt="views"
            />
            <p>ნახვები: {item.analytics.totals.views.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/images/creatorDashboard/svg/trending-up.svg"
              width={14}
              height={14}
              alt="trending"
            />
            <p>
              გამომუშავება: ₾{Number(item.analytics.earnings ?? 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCards = ({ defaultTab = "analytic" }: VideoCardsProps) => {
  const [active, setActive] = useState<Tab>(defaultTab);

  const campaignsQuery = useQuery({
    queryKey: ["creatorCampaigns"],
    queryFn: fetchCreatorCampaigns,
    enabled: active === "analytic",
  });

  const videosQuery = useQuery({
    queryKey: ["creatorVideos"],
    queryFn: fetchCreatorVideos,
    enabled: active === "campaing",
  });

  return (
    <div className="flex flex-col max-w-[1387px] w-full mx-auto justify-center py-[22px]">
      <div className="flex mt-[26px] mb-[40px] max-w-[1440px] w-full justify-between items-center flex-wrap gap-4">
        <ToggleButtons
          active={active}
          setActive={setActive}
          firstLabel="კამპანიები"
          secondLabel="ვიდეოები"
          className="max-w-[536px] w-full flex"
          firstImage="/images/creatorDashboard/svg/trumpet.svg"
          secondImage="/images/creatorDashboard/svg/gallery.svg"
        />
        <Link
          href="/"
          className="bg-[var(--button-bg)] w-[229px] py-3 justify-center border cursor-pointer text-[14px] flex items-center gap-2 text-[var(--white-color)] rounded-[8px]"
        >
          <Image
            src="/images/creatorDashboard/svg/users.svg"
            width={18}
            height={18}
            alt="icon"
          />
          მოძებნე მეტი კამპანია
        </Link>
      </div>

      {active === "analytic" ? (
        <>
          {campaignsQuery.isLoading && <StateMessage>იტვირთება...</StateMessage>}
          {campaignsQuery.isError && (
            <StateMessage tone="error">
              კამპანიების ჩატვირთვა ვერ მოხერხდა
            </StateMessage>
          )}
          {campaignsQuery.isSuccess && campaignsQuery.data.length === 0 && (
            <StateMessage>
              ჯერ არცერთ კამპანიაში არ ხარ გაწევრიანებული
            </StateMessage>
          )}
          <div className="flex flex-wrap justify-start max-w-[1387px] gap-5">
            {campaignsQuery.data?.map((item) => (
              <CampaignCard key={item.campaign.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          {videosQuery.isLoading && <StateMessage>იტვირთება...</StateMessage>}
          {videosQuery.isError && (
            <StateMessage tone="error">
              ვიდეოების ჩატვირთვა ვერ მოხერხდა
            </StateMessage>
          )}
          {videosQuery.isSuccess && videosQuery.data.length === 0 && (
            <StateMessage>ჯერ არ გაქვს ატვირთული ვიდეოები</StateMessage>
          )}
          <div className="flex gap-[27px] flex-wrap justify-start">
            {videosQuery.data?.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCards;
