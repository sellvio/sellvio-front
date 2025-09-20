import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { SocialsValues } from '../schema/SocialsSchema';
import { RegistrationValues } from '../schema/registrationSchema';
import { CompanyValues } from '../schema/companySchema';
import { RegistrationStepTwoValues } from '../schema/bussinesRegistrationSchemaStepTwo';
import { UploadImageFormValues } from '../schema/uploadImageSchema';

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

export type RegistrationStepBussinesValues = {
  register: UseFormRegister<RegistrationStepTwoValues>;
  errors: FieldErrors<RegistrationStepTwoValues>;
};

export type RegistrationBussinesFormProps = {
  register: UseFormRegister<UploadImageFormValues>;
  setValue: UseFormSetValue<UploadImageFormValues>;
  errors: FieldErrors<UploadImageFormValues>;
};
