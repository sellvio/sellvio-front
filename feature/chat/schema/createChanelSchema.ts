import { z } from 'zod';

export const createChatSchea = z.object({
  name: z.string().min(1, 'არხის სახელი სავალდებულოა'),
  channel_state: z.enum(['public', 'private']),
});

export type createChatValue = z.infer<typeof createChatSchea>;
