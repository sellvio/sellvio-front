import { z } from 'zod';

export const updateChanel = z.object({
  name: z.string().min(1, 'არხის სახელი სავალდებულოა'),
  description: z.string().min(1, 'აღწერა სავალდებულოა'),
  //   channel_state: z.enum(['public', 'private']),
});

export type updateChanelValue = z.infer<typeof updateChanel>;
