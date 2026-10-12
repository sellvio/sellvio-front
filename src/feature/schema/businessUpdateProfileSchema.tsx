import { z } from 'zod';

export const BUSINESS_INDUSTRY_OPTIONS = [
  { value: 'Manufacturing', label: 'წარმოება' },
  { value: 'Trade', label: 'ვაჭრობა' },
  { value: 'Services', label: 'მომსახურება' },
  { value: 'Agriculture', label: 'სოფლის მეურნეობა' },
  {
    value: 'EcommerceInformation_Technology',
    label: 'ელ-კომერცია / ინფორმაციული ტექნოლოგიები',
  },
  { value: 'Construction', label: 'მშენებლობა' },
  { value: 'Transportation', label: 'ტრანსპორტი' },
  { value: 'Creative_Industries', label: 'კრეატიული ინდუსტრია' },
  { value: 'Marketing', label: 'მარკეტინგი' },
  { value: 'Other', label: 'სხვა' },
] as const;

export const businessProfileSchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, 'კომპანიის სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    .max(255, 'კომპანიის სახელი ძალიან გრძელია'),
  business_email: z
    .string()
    .trim()
    .email('ელ-ფოსტის ფორმატი არასწორია')
    .or(z.literal(''))
    .optional(),
  phone: z.string().trim().max(50, 'ტელეფონი ძალიან გრძელია').optional(),
  website_url: z.string().trim().max(255, 'ბმული ძალიან გრძელია').optional(),
  description: z.string().trim().optional(),
  business_employee_range: z.string().trim().max(100).optional(),
  location: z.string().trim().max(255, 'ლოკაცია ძალიან გრძელია').optional(),
  business_industry_name: z.string().optional(),
  business_tags: z.array(z.number()).optional(),
});

export type BusinessProfileSchema = z.infer<typeof businessProfileSchema>;
