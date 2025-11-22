import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "შეიყვანე კამპანიის სახელი"),
  budget: z.coerce
    .number()
    .min(0, { message: "დააფიქსირე შენი კამპანიის ჯამური ბიუჯეტი." }),
  duration_days: z.coerce
    .number()
    .min(1, { message: "დააფიქსირე კამპანიის ხანგრძლივობა." }),
  target_creator_types: z
    .array(z.string())
    .min(1, { message: "აირჩიე მინიმუმ ერთი კრეატორის ტიპი." }),
  payment_type: z.string().min(1, { message: "აირჩიე გადახდის ტიპი." }),
  payment_amount: z.coerce
    .number()
    .min(0, { message: "აირჩიე გადახდის რაოდენობის ნაწილი" }),
  payment_per_quantity: z.coerce
    .number()
    .min(0, { message: "აირჩიე გადახდის რაოდენობის ნაწილი" }),
  requirements: z.string().min(1, { message: "შეიყვანე მოთხოვნები." }),

  // Optional fields
  description: z.string().optional(),
  budget_hidden: z.boolean().optional(),
  status: z.string().optional(),
  chat_type: z.string().optional(),
  additional_requirements: z.string().optional(),
  target_audience: z.string().optional(),
  campaign_image_url: z.string().optional(), // Binary file upload
  platforms: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  media: z.array(z.any()).optional(), // Array of objects, passed as JSON string in multipart
  asset_files: z.array(z.string()).optional(), // Upload multiple files (images/videos)
});
export type CampaignSchema = z.infer<typeof campaignSchema>;
