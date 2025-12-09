import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { RegistrationValues } from '../schema/registrationSchema';
import { CompanyValues } from '../schema/companySchema';
import { RegistrationStepTwoValues } from '../schema/businessRegistrationSchemaStepTwo';
import { FormValues } from '../schema/authorisationSchema';

export type TagInputProps<T extends Record<string, unknown>> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
};

export type RegistrationFormProps = {
  register: UseFormRegister<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
};

export type RegistrationFormStepTwo = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};

export type CompanyFormProps = {
  register: UseFormRegister<CompanyValues>;
  errors: FieldErrors<CompanyValues>;
  onSubmit: (e: React.FormEvent) => void;
  setValue: UseFormSetValue<CompanyValues>;
};

export type RegistrationStepBusinessValues = {
  register: UseFormRegister<RegistrationStepTwoValues>;
  errors: FieldErrors<RegistrationStepTwoValues>;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
};
export type IndustryTag = {
  id: number;
  name: string;
};
export type RegistrationFormPropsExtended = {
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
  register: UseFormRegister<RegistrationStepTwoValues>;
  errors: FieldErrors<RegistrationStepTwoValues>;
};
export type BusinessRegisterBody = {
  email: string;
  password: string;
  user_type: 'business';
  company_name: string;
  company_nickName: string;
  legal_status_id: number;
  website_url: string;
  business_email: string;
  phone: string;
  business_tags: number[];
};
export type EnumSelectInputProps = {
  label: string;
  name: string;
  enumOptions: string[];
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue?: UseFormSetValue<any>;
  placeholder?: string;
};
