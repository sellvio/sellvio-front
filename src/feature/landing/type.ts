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

export type CompanyCardProps = {
  createdAt: string;
  avatar: string;
  id: string;
  title: string;
  budget: number;
  description: string;
  totalCreator: number;
  currentlyCreator: number;
  compensation: number;
  verified: boolean;
  categories: string[];
  filters: string[];
  deadline: string;
  buttonUrl: string;
  rating: number;
};

export type CompanyCardsProps = {
  task: CompanyCardProps;
};

export type CompanyCardsListProps = CompanyCardProps[];

export type ProgressBarProps = {
  currentAmount: number;
  goalAmount: number;
};
