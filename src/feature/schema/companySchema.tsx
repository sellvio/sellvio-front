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
  legal_status_id: z
    .number({ error: 'არ აგირჩევიათ კომპანიის სამართლებრივი სტატუსი' })
    .int()
    .min(1, {
      message: 'არ აგირჩევიათ კომპანიის სამართლებრივი სტატუსი',
    }),
  website: z.string().trim().url({ message: 'უნდა იყოს ვალიდური URL.' }),
  business_tags: z
    .array(z.number().min(1), { error: 'მინიმუმ ერთი თეგი უნდა მიუთითო' })
    .min(1, { message: 'მინიმუმ ერთი თეგი უნდა მიუთითო' }),
});

export type CompanyValues = z.infer<typeof CompanySchema>;
