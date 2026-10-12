import { CreatorType, PaymentType } from '../type';

export const creatorTypeLabels: Record<CreatorType, string> = {
  beginner: 'დამწყები',
  experienced: 'გამოცდილი',
  influencer: 'ინფლუენსერი',
  clipper: 'კლიპერი',
};

export const paymentUnitLabels: Record<PaymentType, string> = {
  cost_per_view: 'ნახვაზე',
  cost_per_click: 'კლიკზე',
  cost_per_engagement: 'ჩართულობაზე',
  cost_per_reach: 'მიღწევაზე',
};

export const formatQuantity = (value: number) => {
  if (value >= 1_000_000) return `${+(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${+(value / 1_000).toFixed(1)}K`;
  return String(value);
};

export const getBudgetInfo = (campaign: {
  budget: string;
  campaign_budget_tracking?: { total_budget: string; spent_amount: string | null }[];
}) => {
  const tracking = campaign.campaign_budget_tracking?.[0];
  const total = Number(tracking?.total_budget ?? campaign.budget) || 0;
  const spent = Number(tracking?.spent_amount ?? 0) || 0;
  return { total, spent };
};
