export type ChatType = 'public' | 'private';
export type CampaignStatus =
  | 'active'
  | 'draft'
  | 'paused'
  | 'completed'
  | 'cancelled';
export type PaymentType =
  | 'cost_per_view'
  | 'cost_per_click'
  | 'cost_per_engagement'
  | 'cost_per_reach';
export type CreatorType = 'beginner' | 'influencer' | 'experienced' | 'clipper';

export type BusinessProfile = {
  company_name: string;
  logo_url: string | null;
};

export type CampaignTag = {
  campaign_id: number;
  tag_id: number;
  tags: {
    name: string;
  };
};

export type CampaignCount = {
  campaign_participants: number;
  campaign_videos: number;
};

export type Campaign = {
  id: number;
  business_id: number;
  name: string;
  description: string | null;
  budget: string;
  budget_hidden: boolean;
  duration_days: number;
  finish_date: string | null;
  start_date: string | null;
  end_date: string | null;
  chat_type: ChatType;
  status: CampaignStatus;
  target_creator_types: CreatorType[];
  additional_requirements: string | null;
  payment_type: PaymentType;
  payment_amount: string;
  payment_per_quantity: number;
  requirements: string;
  target_audience: string | null;
  campaign_image_url: string | null;
  created_at: string;
  updated_at: string;
  business_profiles: BusinessProfile;
  campaign_tags: CampaignTag[];
  campaign_platforms?: { platform: string }[];
  campaign_budget_tracking?: CampaignBudgetTracking[];
  _count: CampaignCount;
};

export type CampaignBudgetTracking = {
  total_budget: string;
  spent_amount: string | null;
};

export type CampaignDetails = Campaign & {
  business_profiles: BusinessProfile & { business_email: string | null };
  campaign_assets: {
    asset_name: string | null;
    asset_url: string;
    asset_type: string | null;
  }[];
  campaign_videos: {
    id: number;
    title: string | null;
    cover_url: string | null;
    created_at: string | null;
  }[];
};

export type BusinessCampaign = Campaign & {
  campaign_budget_tracking: CampaignBudgetTracking[];
};

export type JoinableCampaign = Pick<Campaign, 'id' | 'chat_type'>;

export type CompanyCardProps = {
  task: Campaign;
  onOpenDetails: (campaignId: number) => void;
  onJoin: (campaign: JoinableCampaign) => void;
};

export type CompanyCardsProps = Pick<CompanyCardProps, 'onOpenDetails' | 'onJoin'>;

export type CampaingDetailInfoPopupProps = {
  campaignId: number;
  onClose: () => void;
  onJoin: CompanyCardProps['onJoin'];
};

export type ProgressBarProps = {
  currentAmount: number;
  goalAmount: number;
};

export type ButtonProps = {
  id: number;
  label: string;
  href: string;
};

export type ButtonSliderProps = {
  active: 'business' | 'creator';
  setActive: (value: 'business' | 'creator') => void;
};

export type Item = {
  id: number;
  title: string;
  description: string;
  icon: string;
  alt: string;
};

export type DataProps = {
  business: Item[];
  creator: Item[];
};

export type companyStatsDataProps = {
  id: number;
  quantity: string;
  title: string;
  description: string;
  icon: string;
  alt: string;
};

export type CampaingPopupSocialMediaSliderProps = {
  isActive: number;
  setIsActive: (id: number) => void;
};
