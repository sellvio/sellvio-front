export type HeaderBtnsProps = {
  id: number;
  alt: string;
  src: string;
};

export type ProgressDashProps = {
  currentAmount: number;
  goalAmount: number;
};
export type ButtonProps = {
  text?: string;
  color: string;
  size: string;
  img?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export type CompanyCard = {
  status: "აქტიური" | "დასრულებული" | "დაუსრულებელი";
  creator: number;
  view: number;
  fullbudget: number;
  yourbudget: number;
  totalpayment: number;
};
export type ProgressBarProps = {
  currentAmount: number;
  goalAmount: number;
};
