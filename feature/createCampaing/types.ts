export type Item = {
  id: number;
  img: string;
  title: string;
};
export type CreatoreGoalProps = {
  id: string;
  img: string;
  title: string;
  descr: string;
};
export type UploadFileProps = {
  id: number;
  img: string;
  title: string;
};
export type DropDownInputProps = {
  size?: string;
  placeholder?: string;
  options: DropDownOption[];
};
export type DropDownOption = {
  label: string;
  value: string;
};
export type ButtonSliderProps = {
  active: "analytic" | "campaing";
  setActive: (value: "analytic" | "campaing") => void;
  firstLabel: string;
  secondLabel: string;
  firstImage?: string;
  secondImage?: string;
  className?: string;
};
export type TagsProps = {
  label: string;
  placeholder?: string;
  error?: string;
  onChange?: (values: string[]) => void;
};
export type ContentCategoryProps = {
  label?: string;
  placeholder?: string;
  error?: string;
};
