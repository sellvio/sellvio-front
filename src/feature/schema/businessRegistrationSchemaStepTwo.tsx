import { z } from 'zod';

export const RegistrationStepTwoSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(5, { message: 'საკონტაქტო ნომერი უნდა იყოს მინიმუმ 5 სიმბოლო.' })
    .max(20, { message: 'საკონტაქტო ნომერი ძალიან გრძელია.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'უნდა იყოს ვალიდური Email მისამართი.' }),
  company_nickName: z
    .string()
    .trim()
    .min(2, {
      message: 'კომპანიის Nickname უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.',
    })
    .max(50, { message: 'კომპანიის Nickname ძალიან გრძელია.' }),
  password: z
    .string()
    .min(6, { message: 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო.' }),
});

export type RegistrationStepTwoValues = z.infer<
  typeof RegistrationStepTwoSchema
>;
