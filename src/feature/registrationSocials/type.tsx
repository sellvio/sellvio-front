import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SocialsValues } from '../schema/SocialsSchema';
import { RegistrationValues } from '../schema/registrationSchema';
import { CompanyValues } from '../schema/companySchema';

export type TagInputProps = {
  name: keyof SocialsValues;
  register: UseFormRegister<SocialsValues>;
  errors: FieldErrors<SocialsValues>;
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
