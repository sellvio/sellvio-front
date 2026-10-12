import { authRequest } from './authFetch';

export type AnalyticsTotals = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  play_count: number;
  engagement_count: number;
};

export type PlatformName = 'tiktok' | 'instagram' | 'facebook';

// Prisma Decimal fields are serialized as strings
type DecimalLike = string | number | null;

export type BusinessOverview = {
  campaigns: { total: number; active: number; completed: number; paused: number };
  videos: { total: number; approved: number };
  spend: { totalBudget: number; total: number };
  analytics: {
    totals: AnalyticsTotals;
    byPlatform: Partial<Record<PlatformName, AnalyticsTotals>>;
  };
};

export type CampaignOverview = {
  campaign: {
    id: number;
    name: string;
    status: string | null;
    platforms: PlatformName[];
    paymentType: string;
    paymentAmount: DecimalLike;
  };
  budget: {
    total: DecimalLike;
    spent: DecimalLike;
    remaining: DecimalLike;
  } | null;
  participants: { total: number; approved: number };
  videos: { total: number; approved: number };
  analytics: {
    totals: AnalyticsTotals;
    byPlatform: Partial<Record<PlatformName, AnalyticsTotals>>;
  };
};

type VideoAnalyticsRow = {
  platform: PlatformName;
  views: number | null;
};

export type CampaignVideoAnalytics = {
  id: number;
  title: string;
  status: string | null;
  analytics: {
    totals: AnalyticsTotals;
    byPlatform: Partial<Record<PlatformName, VideoAnalyticsRow[]>>;
  };
};

export const fetchBusinessOverview = () =>
  authRequest<BusinessOverview>('/analytics/business/overview');

export const fetchCampaignOverview = (campaignId: number) =>
  authRequest<CampaignOverview>(`/analytics/campaigns/${campaignId}`);

export const fetchCampaignVideoAnalytics = (campaignId: number) =>
  authRequest<CampaignVideoAnalytics[]>(
    `/analytics/campaigns/${campaignId}/videos`
  );
