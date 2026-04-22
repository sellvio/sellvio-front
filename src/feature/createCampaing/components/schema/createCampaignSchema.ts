import { z } from 'zod';

const campaignStatusEnum = z.enum(['draft', 'active', 'completed']);
const chatTypeEnum = z.enum(['public', 'private']);
const creatorTypeEnum = z.enum([
  'beginner',
  'experienced',
  'influencer',
  'clipper',
]);

// ✅ შესწორება #4: revenue_share → cost_per_click (Swagger business rules: CPV, CPC, fixed)
const paymentTypeEnum = z.enum([
  'cost_per_view',
  'cost_per_click',
  'cost_per_engagement',
  'cost_per_reach',
]);
const socialPlatformEnum = z.enum(['instagram', 'tiktok', 'facebook']);
const campaignAssetTypeEnum = z.enum(['link', 'image', 'video', 'file']);

export const trimmedString = (field: string, max = 255) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${field} is required`
          : `${field} must be a string`,
    })
    .trim()
    .min(1, { error: `${field} is required` })
    .max(max, { error: `${field} must be less than ${max} characters` });

export const createCampaignSchema = z.object({
  name: trimmedString('Name', 255),

  description: z
    .string()
    .trim()
    .max(5000, { error: 'Description must be less than 5000 characters' })
    .optional()
    .default(''),

  budget: z.coerce
    .number()
    .positive({ error: 'Budget must be greater than 0' }),

  budget_hidden: z.boolean().default(false),

  duration_days: z.coerce
    .number()
    .int({ error: 'Duration days must be an integer' })
    .positive({ error: 'Duration days must be greater than 0' }),

  // ✅ შესწორება #3: default 'active' → 'draft'
  status: campaignStatusEnum.default('draft'),

  chat_type: chatTypeEnum.default('public'),

  target_creator_types: z
    .array(creatorTypeEnum)
    .min(1, { error: 'At least one target creator type is required' }),

  additional_requirements: z
    .string()
    .trim()
    .max(5000, {
      error: 'Additional requirements must be less than 5000 characters',
    })
    .nullable()
    .optional(),

  payment_type: paymentTypeEnum,

  payment_amount: z.coerce
    .number()
    .positive({ error: 'Payment amount must be greater than 0' }),

  payment_per_quantity: z.coerce
    .number()
    .int({ error: 'Payment per quantity must be an integer' })
    .positive({ error: 'Payment per quantity must be greater than 0' }),

  requirements: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Requirements is required'
          : 'Requirements must be a string',
    })
    .trim()
    .min(10, { error: 'Requirements must be at least 10 characters' })
    .max(5000, { error: 'Requirements must be less than 5000 characters' }),

  target_audience: z
    .string()
    .trim()
    .max(1000, { error: 'Target audience must be less than 1000 characters' })
    .nullable()
    .optional(),

  // ✅ შესწორება #1: string().url() → z.instanceof(File) — Swagger: string($binary)
  campaign_image_url: z.instanceof(File).nullable().optional(),

  platforms: z
    .array(socialPlatformEnum)
    .min(1, { error: 'At least one platform is required' }),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, { error: 'Tag is required' })
        .max(100, { error: 'Tag must be less than 100 characters' })
    )
    .default([]),

  media: z
    .array(
      z.object({
        name: trimmedString('Media name', 255),
        url: z
          .string()
          .trim()
          .url({ error: 'Media URL must be valid' })
          .max(500, { error: 'Media URL must be less than 500 characters' }),
        type: campaignAssetTypeEnum,
      })
    )
    .default([]),

  // ✅ შესწორება #2: array of objects → array of File — Swagger: array<string>($binary)
  asset_files: z.array(z.instanceof(File)).default([]),
});

export type CreateCampaignSchemaType = z.infer<typeof createCampaignSchema>;
export type CreateCampaignFormInput = z.input<typeof createCampaignSchema>;
export type CreateCampaignFormOutput = z.output<typeof createCampaignSchema>;
