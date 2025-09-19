import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { SocialsValues } from '../schema/SocialsSchema';
import { RegistrationValues } from '../schema/registrationSchema';
import { CompanyValues } from '../schema/companySchema';

export type TagInputProps<T extends Record<string, unknown>> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};
export type RegistrationSocialsFormProps = {
  visible: number[];
  register: UseFormRegister<SocialsValues>;
  errors: FieldErrors<SocialsValues>;
};

export type RegistrationFormProps = {
  register: UseFormRegister<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
};

export type CompanyFormProps = {
  register: UseFormRegister<CompanyValues>;
  errors: FieldErrors<CompanyValues>;
};
