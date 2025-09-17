import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RegistrationValues } from '../schema/registrationSchema';

export type ReUsableInputProps = {
  label: string;
  id: keyof RegistrationValues;
  placeholder?: string;
  register: UseFormRegister<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
  type?: string;
};
