import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "სახელი აუცილებელია"),
  description: z.string().optional(),

  budget: z.number().min(1, { message: "ბიუჯეტი უნდა იყოს 1-ზე მეტი" }),
  budget_hidden: z.boolean(),
  duration_days: z.number(),
  status: z.enum(["draft", "active", "paused", "completed"]).default("draft"),
  chat_type: z.enum(["public", "private"]),

  target_creator_types: z
    .array(z.enum(["beginner", "influencer", "expert", "creator"]))
    .optional(),

  additional_requirements: z.string().optional(),

  payment_type: z.enum(["cost_per_view", "fixed", "cost_per_click"]),
  payment_amount: z.number(),
  payment_per_quantity: z.number(),

  requirements: z.string().optional(),
  target_audience: z.string().optional(),

  campaign_image_url: z.string().url(),

  platforms: z.array(z.enum(["instagram", "tiktok", "youtube", "facebook"])),

  tags: z.array(z.string()).optional(),

  media: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
      type: z.enum(["image", "video"]),
    })
  ),
});
export type CampaignSchema = z.infer<typeof campaignSchema>;
