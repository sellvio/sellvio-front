import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SocialsValues } from '../schema/SocialsSchema';

export type TagInputProps = {
  name: keyof SocialsValues;
  register: UseFormRegister<SocialsValues>;
  errors: FieldErrors<SocialsValues>;
};
