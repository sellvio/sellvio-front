import React from 'react';

export type ChatType = 'public' | 'private';
export type CampaignStatus = 'active' | 'draft';
export type PaymentType = 'cost_per_view' | 'cost_per_click';
export type CreatorType = 'beginner' | 'influencer' | 'experienced';

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
  description: string;
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
  _count: CampaignCount;
};

export type CompanyCardProps = {
  task: Campaign;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CompanyCardsProps = {
  setPopupOpen: CompanyCardProps['setPopupOpen'];
};

export type CampaingDetailInfoPopupProps = {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export type CampaingPopupSocialMediaSliderProps = {
  isActive: number;
  setIsActive: (id: number) => void;
};
