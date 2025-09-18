import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

export interface ReUsableInputProps<T extends FieldValues = FieldValues> {
  label: string;
  id: Path<T>;
  placeholder?: string;
  type?: string;
  icon?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
