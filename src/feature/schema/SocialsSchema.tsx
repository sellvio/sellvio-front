import { z } from 'zod';

export const SocialsSchema = z.object({
  facebook: z.string().url('უნდა იყოს ვალიდური URL').optional(),
  tiktok: z.string().url('უნდა იყოს ვალიდური URL').optional(),
  instagram: z.string().url('უნდა იყოს ვალიდური URL').optional(),
  tags: z.array(z.string().min(1)).min(1, 'მინიმუმ ერთი თეგი უნდა მიუთითო'),
});

export type SocialsValues = z.infer<typeof SocialsSchema>;
