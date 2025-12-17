import { z } from 'zod';

export const channelSchema = z.object({
  name: z.string(),
  channel_type: z.string(),
  channel_state: z.enum(['public', 'private']),
  description: z.string(),
});
export type channelValue = z.infer<typeof channelSchema>;
