import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';
import { z } from 'zod';

const agentFabricErrorDataSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        value: z.unknown().optional(),
      })
    )
    .optional(),
});

export type AgentFabricErrorData = z.infer<typeof agentFabricErrorDataSchema>;

export const agentFabricFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: agentFabricErrorDataSchema,
  errorToMessage: (data) => data.message || data.error,
});
