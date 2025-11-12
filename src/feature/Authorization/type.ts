import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

export type ReUsableInputProps<T extends FieldValues = FieldValues> = {
  label: string;
  id: Path<T>;
  placeholder?: string;
  type?: string;
  icon?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};
export type BusinessCreatorBtnSliderProps = {
  registrationType: 'business' | 'creator' | undefined;
  setRegistrationType: (type: 'business' | 'creator') => void;
};
export type UserType = 'creator' | 'business';

export type CreatorRegisterBody = {
  email: string;
  password: string;
  user_type: 'creator';
  first_name: string;
  last_name: string;
  nickname?: string;
  date_of_birth: string;
};

export type RegisterResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    user_type: UserType;
    email_verified: boolean;
    created_at: string;
  };
};
