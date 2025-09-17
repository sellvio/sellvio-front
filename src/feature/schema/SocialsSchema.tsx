import { z } from 'zod';

export const SocialsSchema = z.object({
  facebook: z.string().url('უნდა იყოს ვალიდური URL').optional(),
  tiktok: z.string().url('უნდა იყოს ვალიდური URL').optional(),
  instagram: z.string().url('უნდა იყოს ვალიდური URL').optional(),
});

export type SocialsValues = z.infer<typeof SocialsSchema>;
