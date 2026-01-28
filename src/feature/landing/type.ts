export type ButtonProps = {
  id: number;
  label: string;
  href: string;
};

export type companyStatsDataProps = {
  id: number;
  quantity: string;
  title: string;
  description: string;
  icon: string;
  alt: string;
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

// type.ts

export type ChatType = 'public' | 'private';
export type CampaignStatus = 'active' | 'draft';
export type PaymentType = 'cost_per_view' | 'cost_per_click';
export type CreatorType = 'beginner' | 'influencer' | 'experienced';

export interface BusinessProfile {
  company_name: string;
  logo_url: string | null;
}

export interface CampaignTag {
  campaign_id: number;
  tag_id: number;
  tags: {
    name: string;
  };
}

export interface CampaignCount {
  campaign_participants: number;
  campaign_videos: number;
}

export interface Campaign {
  id: number;
  business_id: number;
  name: string;
  description: string;

  chat_type: ChatType;
  status: CampaignStatus;

  target_creator_types: CreatorType[];
  additional_requirements: string | null;

  start_date: string | null;
  finish_date: string | null;

  business_profiles: BusinessProfile;
  campaign_tags: CampaignTag[];
  _count: CampaignCount;
}

export interface CompanyCardProps {
  task: Campaign;
}

export type CompanyCardsProps = {
  task: CompanyCardProps;
};

export type CompanyCardsListProps = CompanyCardProps[];

export type ProgressBarProps = {
  currentAmount: number;
  goalAmount: number;
};
