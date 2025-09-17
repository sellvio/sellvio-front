import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormValues } from './schema/authorisationSchema';

export type ReUsableInputProps = {
  label: string;
  id: keyof FormValues;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  type?: string;
};
