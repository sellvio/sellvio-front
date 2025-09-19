import { z } from 'zod';

// StepOne — ჩვეულებრივი რეგისტრაცია
export const RegistrationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' })
    .max(50, { message: 'სახელი ძალიან გრძელია' }),
  lastName: z
    .string()
    .min(2, { message: 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' })
    .max(50, { message: 'გვარი ძალიან გრძელია' }),
  nickname: z
    .string()
    .min(2, { message: 'ზედმეტსახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' })
    .max(30, { message: 'ზედმეტსახელი ძალიან გრძელია' }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'თარიღი უნდა იყოს ფორმატში YYYY-MM-DD',
  }),
});

export type RegistrationValues = z.infer<typeof RegistrationSchema>;

export const RegistrationStepBussinesSchema = z
  .object({
    contactNumber: z.string().min(9, { message: 'ნომერი ძალიან მოკლეა' }),
    email: z.string().email({ message: 'შეიყვანე სწორი Email' }),
    nickname: z
      .string()
      .min(2, { message: 'ზედმეტსახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' }),
    password: z.string().min(6, { message: 'პაროლი მინიმუმ 6 სიმბოლო' }),
    confirmPassword: z.string().min(6, { message: 'გაიმეორეთ პაროლი' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'პაროლები არ ემთხვევა',
    path: ['confirmPassword'],
  });

export type RegistrationStepBussinesValues = z.infer<
  typeof RegistrationStepBussinesSchema
>;
