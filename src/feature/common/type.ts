export type FooterOption = {
  id: number;
  label: string;
  href: string;
};

export type FooterItem = {
  id: number;
  title: string;
  options: FooterOption[];
};
