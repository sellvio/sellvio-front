import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { SocialsValues } from '../schema/SocialsSchema';
import { RegistrationValues } from '../schema/registrationSchema';
import { CompanyValues } from '../schema/companySchema';
import { UploadImageFormValues } from '../schema/uploadImageSchema';
import { RegistrationStepTwoValues } from '../schema/businessRegistrationSchemaStepTwo';
import { FormValues } from '../schema/authorisationSchema';

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

export type RegistrationFormStepTwo = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<RegistrationValues>;
};

export type CompanyFormProps = {
  register: UseFormRegister<CompanyValues>;
  errors: FieldErrors<CompanyValues>;
};

export type RegistrationStepBusinessValues = {
  register: UseFormRegister<RegistrationStepTwoValues>;
  errors: FieldErrors<RegistrationStepTwoValues>;
};

export type RegistrationBusinessFormProps = {
  register: UseFormRegister<UploadImageFormValues>;
  setValue: UseFormSetValue<UploadImageFormValues>;
  errors: FieldErrors<UploadImageFormValues>;
  onSubmit: (e: React.FormEvent) => void;
};
