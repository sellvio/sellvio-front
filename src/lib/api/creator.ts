import { authRequest } from './authFetch';
import { AnalyticsTotals, PlatformName } from './analytics';

type DecimalLike = string | number | null;

export type CreatorOverview = {
  campaigns: { total: number; approved: number; pending: number };
  videos: { total: number; approved: number; underReview: number };
  earnings: { total: number };
  analytics: { totals: AnalyticsTotals };
};

export type CreatorCampaign = {
  participationStatus: 'pending' | 'approved' | 'rejected' | null;
  appliedAt: string | null;
  campaign: {
    id: number;
    name: string;
    status: string | null;
    finishDate: string | null;
    paymentType: string;
    paymentAmount: DecimalLike;
    platforms: PlatformName[];
  };
  videos: { total: number; approved: number };
  analytics: { totals: AnalyticsTotals; earnings: number };
};

export type CreatorVideo = {
  id: number;
  title: string;
  status: 'under_review' | 'approved' | 'rejected' | null;
  videoUrl: string;
  coverUrl: string | null;
  submittedAt: string | null;
  campaign: { id: number; name: string; status: string | null };
  socialPosts: {
    id: number;
    platform: PlatformName;
    post_url: string | null;
    is_verified: boolean | null;
  }[];
  analytics: { totals: AnalyticsTotals; earnings: number };
};

export type CreatorProfileData = {
  id: number;
  email: string;
  created_at: string | null;
  creator_profiles: {
    first_name: string | null;
    last_name: string | null;
    nickname: string | null;
    creator_type: 'beginner' | 'experienced' | 'influencer' | 'clipper' | null;
    bio: string | null;
    profile_image_url: string | null;
    location: string | null;
    phone: string | null;
    creator_tags: { tag_id: number; tags: { name: string } }[];
    social_media_accounts: {
      platform: PlatformName;
      username: string | null;
      profile_url: string | null;
      followers_count: number | null;
      is_connected: boolean | null;
    }[];
  } | null;
};

export type CreatorProfileUpdate = {
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  creator_type?: string;
  tags?: number[];
};

export type Tag = { id: number; name: string };

export const fetchCreatorOverview = () =>
  authRequest<CreatorOverview>('/analytics/creator/overview');

export const fetchCreatorCampaigns = () =>
  authRequest<CreatorCampaign[]>('/analytics/creator/campaigns');

export const fetchCreatorVideos = () =>
  authRequest<CreatorVideo[]>('/analytics/creator/videos');

export const fetchCreatorProfile = () =>
  authRequest<CreatorProfileData>('/auth/profile');

export const updateCreatorProfile = (body: CreatorProfileUpdate) =>
  authRequest<unknown>('/auth/profile', { method: 'PATCH', body });

export const fetchAllTags = async (): Promise<Tag[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/enums/tags/all`
  );
  if (!res.ok) throw new Error('Failed to load tags');
  const json = await res.json();
  return json?.data ?? [];
};

export const addVideoSocialPost = (
  videoId: number,
  body: { platform: PlatformName; post_url: string }
) =>
  authRequest<unknown>(`/videos/${videoId}/social-post`, {
    method: 'PATCH',
    body,
  });
