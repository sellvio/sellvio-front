import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "შეიყვანე კამპანიის სახელი"),
  description: z.string().min(15, "აღწერე კამპანია მინიმუმ 15 სიტვით."),

  budget: z.coerce
    .number()
    .min(0, { message: "დააფიქსირე შენი კამპანიის ჯამური ბიუჯეტი." }),
  budget_hidden: z.boolean(),
  duration_days: z.number(),
  status: z.enum(["draft", "active", "paused", "completed"]).default("draft"),
  chat_type: z.enum(["public", "private"]),

  target_creator_types: z.array(
    z.enum(["beginner", "influencer", "expert", "creator"])
  ),

  additional_requirements: z.string(),

  payment_type: z.enum(["cost_per_view", "fixed", "cost_per_click"]),
  payment_amount: z.number().min(2, "აირჩიე გადახდის რაოდენობის ნაწილი"),
  payment_per_quantity: z.number().min(1, "აირჩიე გადახდის რაოდენობის ნაწილი"),

  requirements: z.string(),
  target_audience: z.string(),

  campaign_image_url: z.string().url(),

  platforms: z.array(z.enum(["instagram", "tiktok", "youtube", "facebook"])),

  tags: z.array(z.string()),

  media: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
      type: z.enum(["image", "video"]),
    })
  ),
});
export type CampaignSchema = z.infer<typeof campaignSchema>;
