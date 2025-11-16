import { z } from 'zod';

export const CompanySchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, {
      message:
        'კომპანიის სამართლებრივი სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.',
    })
    .max(100, { message: 'კომპანიის სამართლებრივი სახელი ძალიან გრძელია.' }),
  legal_status: z
    .string()
    .trim()
    .min(2, {
      message:
        'კომპანიის სამართლებრივი სტატუსი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.',
    })
    .max(50, { message: 'კომპანიის სამართლებრივი სტატუსი ძალიან გრძელია.' }),
  website: z.string().trim().url({ message: 'უნდა იყოს ვალიდური URL.' }),
  // business_tags: z
  //   .array(z.string().min(1))
  //   .min(1, { message: 'მინიმუმ ერთი თეგი უნდა მიუთითო' }),
});

export type CompanyValues = z.infer<typeof CompanySchema>;
