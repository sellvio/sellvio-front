import { z } from 'zod';

export const CompanySchema = z.object({
  legalName: z
    .string()
    .trim()
    .min(2, {
      message:
        'კომპანიის სამართლებრივი სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.',
    })
    .max(100, { message: 'კომპანიის სამართლებრივი სახელი ძალიან გრძელია.' }),
  legalStatus: z
    .string()
    .trim()
    .min(2, {
      message:
        'კომპანიის სამართლებრივი სტატუსი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.',
    })
    .max(50, { message: 'კომპანიის სამართლებრივი სტატუსი ძალიან გრძელია.' }),
  website: z.string().trim().url({ message: 'უნდა იყოს ვალიდური URL.' }),
});

export type CompanyValues = z.infer<typeof CompanySchema>;
