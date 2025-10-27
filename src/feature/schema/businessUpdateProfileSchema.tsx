import { z } from 'zod';

export const businessProfileSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  business_email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  phone: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  business_employee_range: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  business_cover_image_url: z.string().nullable().optional(),
  legal_status: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  business_industry_name: z.string().nullable().optional(),
  business_tags: z
    .array(
      z.object({
        tag_id: z.number(),
        tags: z.object({
          name: z.string(),
        }),
      })
    )
    .nullable()
    .optional(),
});

export type BusinessProfileSchema = z.infer<typeof businessProfileSchema>;
