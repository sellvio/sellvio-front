import { z } from 'zod';

export const RegistrationStepTwoSchema = z
  .object({
    phone: z
      .string()
      .trim()
      .min(5, { message: 'საკონტაქტო ნომერი უნდა იყოს მინიმუმ 5 სიმბოლო.' })
      .max(20, { message: 'საკონტაქტო ნომერი ძალიან გრძელია.' }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: 'უნდა იყოს ვალიდური Email მისამართი.' }),
    company_nickName: z
      .string()
      .trim()
      .min(2, {
        message: 'კომპანიის Nickname უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.',
      })
      .max(50, { message: 'კომპანიის Nickname ძალიან გრძელია.' }),
    // Backend RegisterDto: password must be 12-72 characters
    password: z
      .string()
      .min(12, { message: 'პაროლი უნდა იყოს მინიმუმ 12 სიმბოლო.' })
      .max(72, { message: 'პაროლი ძალიან გრძელია.' }),
    repeatPassword: z.string().min(1, { message: 'გაიმეორეთ პაროლი' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'პაროლები არ ემთხვევა',
    path: ['repeatPassword'],
  });

export type RegistrationStepTwoValues = z.infer<
  typeof RegistrationStepTwoSchema
>;
