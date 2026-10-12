import { z } from 'zod';

export const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'შეიყვანე სწორი ემაილი' })
    .max(254, { message: 'ემაილი ძალიან გრძელია' }),
  password: z
    .string()
    .min(6, { message: 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს' })
    // backend allows passwords up to 72 characters at registration
    .max(72, { message: 'პაროლი ძალიან გრძელია' }),
});

export type FormValues = z.infer<typeof FormSchema>;
