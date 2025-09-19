import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(4, "Company name must be at least 4 characters"),
  budget: z.string().min(1, "Budget must be at least 1 character"),
  companyDesc: z
    .string()
    .min(10, "Company description must be at least 10 characters"),
  quantity: z.string().min(1, "Quantity is required"),
  amount: z.string().min(1, "Amount is required"),
  auditory: z.string().min(7, "Auditory must be at least 7 characters"),
  requirements: z.string().min(7, "Requirements must be at least 7 characters"),
  payMent: z.string().min(1, "Requirements must be at least 7 characters"),
  extraRequirements: z
    .string()
    .min(7, "Extra requirements must be at least 7 characters"),
  tag: z.string().min(7, "Extra requirements must be at least 7 characters"),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
