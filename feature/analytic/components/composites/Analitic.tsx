"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  AnalyticsTotals,
  PlatformName,
  fetchBusinessOverview,
  fetchCampaignOverview,
  fetchCampaignVideoAnalytics,
} from "@/lib/api/analytics";
import StateMessage from "../../../components/StateMessage";
import AnaliticTotalCards, { TotalCard } from "../primitives/AnaliticTotalCards";
import PlatformPerformance, {
  BestVideo,
} from "../primitives/PlatformPerformance";

const money = (value: unknown) => `₾${Number(value ?? 0).toLocaleString()}`;
const count = (value: unknown) => Number(value ?? 0).toLocaleString();

const Analitic = () => {
  const searchParams = useSearchParams();
  const rawId = searchParams.get("campaignId");
  const campaignId = rawId && /^\d+$/.test(rawId) ? Number(rawId) : null;

  const overviewQuery = useQuery({
    queryKey: ["businessOverview"],
    queryFn: fetchBusinessOverview,
    enabled: campaignId === null,
  });

  const campaignQuery = useQuery({
    queryKey: ["campaignOverview", campaignId],
    queryFn: () => fetchCampaignOverview(campaignId as number),
    enabled: campaignId !== null,
  });

  const videosQuery = useQuery({
    queryKey: ["campaignVideoAnalytics", campaignId],
    queryFn: () => fetchCampaignVideoAnalytics(campaignId as number),
    enabled: campaignId !== null,
  });

  const activeQuery = campaignId !== null ? campaignQuery : overviewQuery;

  let title = "ანალიტიკა";
  let cards: TotalCard[] = [];
  let byPlatform: Partial<Record<PlatformName, AnalyticsTotals>> = {};
  let bestVideos: Partial<Record<PlatformName, BestVideo>> | undefined;

  if (campaignId !== null && campaignQuery.data) {
    const data = campaignQuery.data;
    title = `ანალიტიკა — ${data.campaign.name}`;
    cards = [
      { id: 1, title: "მონაწილეები", quantity: count(data.participants.total) },
      { id: 2, title: "ჯამური ბიუჯეტი", quantity: money(data.budget?.total) },
      { id: 3, title: "ჯამური ნახვა", quantity: count(data.analytics.totals.views) },
      { id: 4, title: "ჯამური გასავალი", quantity: money(data.budget?.spent) },
    ];
    byPlatform = data.analytics.byPlatform;

    bestVideos = {};
    for (const video of videosQuery.data ?? []) {
      for (const [platform, rows] of Object.entries(video.analytics.byPlatform)) {
        const views = (rows ?? []).reduce((sum, r) => sum + (r.views ?? 0), 0);
        const current = bestVideos[platform as PlatformName];
        if (!current || views > current.views) {
          bestVideos[platform as PlatformName] = { title: video.title, views };
        }
      }
    }
  } else if (campaignId === null && overviewQuery.data) {
    const data = overviewQuery.data;
    cards = [
      { id: 1, title: "ჯამური კამპანიები", quantity: count(data.campaigns.total) },
      { id: 2, title: "ჯამური ბიუჯეტი", quantity: money(data.spend.totalBudget) },
      { id: 3, title: "ჯამური ნახვა", quantity: count(data.analytics.totals.views) },
      { id: 4, title: "ჯამური გასავალი", quantity: money(data.spend.total) },
    ];
    byPlatform = data.analytics.byPlatform;
  }

  return (
    <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-[32px] py-[22px]">
      {campaignId !== null && (
        <Link
          href="/buisnessDashboard"
          className="px-[26px] text-[14px] text-[var(--buisness-card-info)] font-medium"
        >
          ← კამპანიებზე დაბრუნება
        </Link>
      )}
      {activeQuery.isLoading && <StateMessage>იტვირთება...</StateMessage>}
      {activeQuery.isError && (
        <StateMessage tone="error">
          ანალიტიკის ჩატვირთვა ვერ მოხერხდა
        </StateMessage>
      )}
      {activeQuery.isSuccess && (
        <>
          <AnaliticTotalCards title={title} cards={cards} />
          <PlatformPerformance byPlatform={byPlatform} bestVideos={bestVideos} />
        </>
      )}
    </div>
  );
};

export default Analitic;
