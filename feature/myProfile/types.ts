export type ButtonProps = {
  text?: string;
  color: string;
  size: string;
  img?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export type TagsProps = {
  label: string;
  placeholder?: string;
  error?: string;
  onChange?: (values: string[]) => void;
};
export type TagFieldProps = {
  label: string;
  placeholder?: string;
  error?: string;
  onChange?: (values: string[]) => void;
};
export type InputFieldProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  textarea?: boolean;
  className?: string;
};
export type socmediaPlatform = {
  id: string;
  src: string;
  title: string;
  placeholder: string;
};
export type Creator = {
  id: number;
  name: string;
  badge: string;
  badgeIcon: string;
  profileImg: string;
  location: {
    icon: string;
    text: string;
  };
  joined: {
    icon: string;
    text: string;
  };
  views: {
    icon: string;
    text: string;
  };
  bio: string;
};
