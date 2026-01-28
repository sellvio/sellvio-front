import { z } from 'zod';

export const addMemberSchema = z.object({
  user_ids: z
    .array(z.number())
    .min(1, 'მომხმარებელთა სია არ უნდა იყოს ცარიელი'),
});

export type addMemberValue = z.infer<typeof addMemberSchema>;
