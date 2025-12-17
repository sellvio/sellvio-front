import { z } from 'zod';

export const channelSchema = z.object({
  name: z.string().min(1, 'არხის სახელი სავალდებულოა'),
  description: z.string().min(1, 'აღწერა სავალდებულოა'),
  channel_type: z.string().optional(),
  channel_state: z.enum(['public', 'private']),
});

export type channelValue = z.infer<typeof channelSchema>;
