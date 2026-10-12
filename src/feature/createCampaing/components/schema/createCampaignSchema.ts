import { z } from 'zod';

const campaignStatusEnum = z.enum(['draft', 'active']);
const chatTypeEnum = z.enum(['public', 'private']);
const creatorTypeEnum = z.enum([
  'beginner',
  'experienced',
  'influencer',
  'clipper',
]);

// Matches the backend `payment_type` enum (prisma schema / swagger)
const paymentTypeEnum = z.enum(
  ['cost_per_view', 'cost_per_click', 'cost_per_engagement', 'cost_per_reach'],
  { error: 'აირჩიეთ შეთავაზების ტიპი' }
);
const socialPlatformEnum = z.enum(['instagram', 'tiktok', 'facebook']);
const campaignAssetTypeEnum = z.enum(['link', 'image', 'video', 'file']);

const hasMaxTwoDecimals = (value: number) =>
  Math.abs(Math.round(value * 100) - value * 100) < 1e-6;

export const trimmedString = (field: string, max = 255, min = 1) =>
  z
    .string({ error: `${field} სავალდებულოა` })
    .trim()
    .min(1, { error: `${field} სავალდებულოა` })
    .min(min, { error: `${field} უნდა შეიცავდეს მინიმუმ ${min} სიმბოლოს` })
    .max(max, {
      error: `${field} არ უნდა აღემატებოდეს ${max} სიმბოლოს`,
    });

// Empty inputs become `undefined` so the user sees "required" instead of "> 0"
const toNumber = (value: unknown) =>
  value === '' || value === null || value === undefined
    ? undefined
    : Number(value);

const numberField = (field: string) =>
  z.number({
    error: (issue) =>
      issue.input === undefined
        ? `${field} სავალდებულოა`
        : `${field} უნდა იყოს რიცხვი`,
  });

export const createCampaignSchema = z.object({
  name: trimmedString('კამპანიის სახელი', 255, 3),

  description: z
    .string()
    .trim()
    .max(5000, { error: 'აღწერა არ უნდა აღემატებოდეს 5000 სიმბოლოს' })
    .optional()
    .default(''),

  budget: z.preprocess(
    toNumber,
    numberField('ბიუჯეტი')
      .min(0.01, { error: 'ბიუჯეტი უნდა იყოს 0-ზე მეტი' })
      .refine(hasMaxTwoDecimals, {
        error: 'ბიუჯეტი შეიძლება შეიცავდეს მაქსიმუმ 2 ათწილადს',
      })
  ),

  budget_hidden: z.boolean().default(false),

  duration_days: z.preprocess(
    toNumber,
    numberField('ხანგრძლივობა')
      .int({ error: 'ხანგრძლივობა უნდა იყოს მთელი რიცხვი' })
      .min(1, { error: 'ხანგრძლივობა უნდა იყოს მინიმუმ 1 დღე' })
  ),

  status: campaignStatusEnum.default('active'),

  chat_type: chatTypeEnum.default('public'),

  target_creator_types: z
    .array(creatorTypeEnum, { error: 'აირჩიეთ მინიმუმ ერთი შემქმნელის ტიპი' })
    .min(1, { error: 'აირჩიეთ მინიმუმ ერთი შემქმნელის ტიპი' }),

  additional_requirements: z
    .string()
    .trim()
    .max(5000, {
      error: 'დამატებითი მოთხოვნები არ უნდა აღემატებოდეს 5000 სიმბოლოს',
    })
    .nullable()
    .optional(),

  payment_type: paymentTypeEnum,

  payment_amount: z.preprocess(
    toNumber,
    numberField('ფასი')
      .min(0.01, { error: 'ფასი უნდა იყოს 0-ზე მეტი' })
      .refine(hasMaxTwoDecimals, {
        error: 'ფასი შეიძლება შეიცავდეს მაქსიმუმ 2 ათწილადს',
      })
  ),

  payment_per_quantity: z.preprocess(
    toNumber,
    numberField('მოცულობა')
      .int({ error: 'მოცულობა უნდა იყოს მთელი რიცხვი' })
      .min(1, { error: 'მოცულობა უნდა იყოს 0-ზე მეტი' })
  ),

  requirements: z
    .string({ error: 'კამპანიის მოთხოვნები სავალდებულოა' })
    .trim()
    .min(10, {
      error: 'კამპანიის მოთხოვნები უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს',
    })
    .max(5000, {
      error: 'კამპანიის მოთხოვნები არ უნდა აღემატებოდეს 5000 სიმბოლოს',
    }),

  target_audience: z
    .string()
    .trim()
    .max(1000, {
      error: 'სამიზნე აუდიტორია არ უნდა აღემატებოდეს 1000 სიმბოლოს',
    })
    .nullable()
    .optional(),

  // Sent as a multipart file; the backend uploads it and stores the URL
  campaign_image_url: z.instanceof(File).nullable().optional(),

  platforms: z
    .array(socialPlatformEnum, { error: 'აირჩიეთ მინიმუმ ერთი პლატფორმა' })
    .min(1, { error: 'აირჩიეთ მინიმუმ ერთი პლატფორმა' }),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, { error: 'თეგი არ შეიძლება იყოს ცარიელი' })
        .max(100, { error: 'თეგი არ უნდა აღემატებოდეს 100 სიმბოლოს' })
    )
    .default([]),

  media: z
    .array(
      z.object({
        name: trimmedString('მედიის სახელი', 255),
        url: z
          .string()
          .trim()
          .url({ error: 'მედიის ბმული არასწორია' })
          .max(500, { error: 'მედიის ბმული ძალიან გრძელია' }),
        type: campaignAssetTypeEnum,
      })
    )
    .default([]),

  // Sent as multiple multipart file parts under `asset_files`
  asset_files: z
    .array(z.instanceof(File))
    .max(10, { error: 'შეგიძლიათ მაქსიმუმ 10 ფაილის ატვირთვა' })
    .default([]),
});

export type CreateCampaignSchemaType = z.infer<typeof createCampaignSchema>;
export type CreateCampaignFormInput = z.input<typeof createCampaignSchema>;
export type CreateCampaignFormOutput = z.output<typeof createCampaignSchema>;
