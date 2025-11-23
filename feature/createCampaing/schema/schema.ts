import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "შეიყვანე კამპანიის სახელი"),
  description: z.string().min(15, "აღწერე კამპანია მინიმუმ 15 სიტვით."),

  budget: z
    .any()
    .refine(
      (val) => {
        if (val === "" || val === null || val === undefined) {
          return false;
        }
        const num = Number(val);
        return !isNaN(num) && num >= 0;
      },
      {
        message: "დააფიქსირე შენი კამპანიის ჯამური ბიუჯეტი.",
      }
    )
    .transform((val) => Number(val)),
  budget_hidden: z.boolean(),
  duration_days: z
    .number({
      message: "მიუთითე კამპანიის ხანგრძლივობა",
    })
    .min(1, { message: "მიუთითე კამპანიის ხანგრძლივობა" }),
  status: z.enum(["draft", "active", "paused", "completed"]).default("draft"),
  chat_type: z.enum(["public", "private"], {
    message: "აირჩიე ჩატში გაწევრიანების ტიპი",
  }),

  target_creator_types: z.preprocess((val) => {
    if (val === undefined || val === null) return [];
    return val;
  }, z.array(z.enum(["beginner", "influencer", "expert", "creator"]))),

  additional_requirements: z.string(),

  payment_type: z.enum(["cost_per_view", "fixed", "cost_per_click"], {
    message: "აირჩიე შეთავაზების ტიპი",
  }),
  payment_amount: z
    .any()
    .refine(
      (val) => {
        if (val === "" || val === null || val === undefined) {
          return false;
        }
        const num = Number(val);
        return !isNaN(num) && num >= 2;
      },
      {
        message: "აირჩიე გადახდის თანხა",
      }
    )
    .transform((val) => Number(val)),
  payment_per_quantity: z
    .any()
    .refine(
      (val) => {
        if (val === "" || val === null || val === undefined) {
          return false;
        }
        const num = Number(val);
        return !isNaN(num) && num >= 1;
      },
      {
        message: "აირჩიე გადახდის რაოდენობის ნაწილი",
      }
    )
    .transform((val) => Number(val)),

  requirements: z.string().min(15, { message: "მიუთითე კამპანიის მოთხოვნები" }),
  target_audience: z.string().min(1, {
    message: "მიუთითე კამპანიის სამიზნე აუდიტორია",
  }),

  campaign_image_url: z.string().url().optional(),

  platforms: z.preprocess((val) => {
    if (val === undefined || val === null) {
      return [];
    }
    return val;
  }, z.array(z.enum(["instagram", "tiktok", "youtube", "facebook"])).min(1, { message: "აირჩიე პლათფორმა შენი კამპანიისთვის" })),

  tags: z.array(z.string().min(1, { message: "შიყვანე კამპანიის ტაგები" })),

  media: z.array(
    z.object(
      {
        name: z.string(),
        url: z.string().url(),
        type: z.enum(["image", "video"]),
      },
      { message: "ატვირთეთ ფაილი" }
    )
  ),
});
export type CampaignSchema = z.infer<typeof campaignSchema>;
