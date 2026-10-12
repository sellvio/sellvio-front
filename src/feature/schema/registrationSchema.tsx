import { z } from 'zod';

export const RegistrationSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' })
    .max(50, { message: 'სახელი ძალიან გრძელია' }),
  last_name: z
    .string()
    .min(2, { message: 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' })
    .max(50, { message: 'გვარი ძალიან გრძელია' }),
  nickname: z
    .string()
    .min(2, { message: 'ზედმეტსახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' })
    .max(30, { message: 'ზედმეტსახელი ძალიან გრძელია' }),
  date_of_birth: z
    .date({
      error: 'დაბადების თარიღი სავალდებულოა',
    })
    .max(new Date(), { message: 'თარიღი არ შეიძლება მომავალში იყოს' }),
});

export type RegistrationValues = z.infer<typeof RegistrationSchema>;

// Backend RegisterDto: password must be 12-72 characters
export const CreatorStepTwoSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: 'შეიყვანე სწორი ემაილი' })
      .max(254, { message: 'ემაილი ძალიან გრძელია' }),
    password: z
      .string()
      .min(12, { message: 'პაროლი უნდა შეიცავდეს მინიმუმ 12 სიმბოლოს' })
      .max(72, { message: 'პაროლი ძალიან გრძელია' }),
    repeatPassword: z.string().min(1, { message: 'გაიმეორეთ პაროლი' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'პაროლები არ ემთხვევა',
    path: ['repeatPassword'],
  });

export type CreatorStepTwoValues = z.infer<typeof CreatorStepTwoSchema>;

export const RegistrationStepBusinessSchema = z
  .object({
    contactNumber: z.string().min(9, { message: 'ნომერი ძალიან მოკლეა' }),
    email: z.string().email({ message: 'შეიყვანე სწორი Email' }),
    nickname: z
      .string()
      .min(2, { message: 'ზედმეტსახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' }),
    password: z.string().min(12, { message: 'პაროლი მინიმუმ 12 სიმბოლო' }),
    repeatPassword: z.string().min(1, { message: 'გაიმეორეთ პაროლი' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'პაროლები არ ემთხვევა',
    path: ['repeatPassword'],
  });

export type RegistrationStepBusinesValuess = z.infer<
  typeof RegistrationStepBusinessSchema
>;
