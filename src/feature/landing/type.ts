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
