import { z } from 'zod';

export const activityPayloadSchema = z.object({
    handle: z.string().min(1),
    type: z.enum(['TWEET', 'RETWEET', 'REPLY'] as const),
    timestamp: z.string().datetime().optional()
});
