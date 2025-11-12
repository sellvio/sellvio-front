import { z } from 'zod';

export const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address.' })
    .max(254, { message: 'Email is too long.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(32, { message: 'Password must not exceed 32 characters.' }),
});
export type FormValues = z.infer<typeof FormSchema>;
