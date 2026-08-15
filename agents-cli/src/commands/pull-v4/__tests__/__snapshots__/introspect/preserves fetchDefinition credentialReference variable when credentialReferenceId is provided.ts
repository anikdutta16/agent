import { contextConfig, fetchDefinition, headers } from '@agent-fabric/agents-core';
import { z } from 'zod';
import { agentFabricApiKey } from '../credentials/agent-fabric-api-key';
export const supportContextHeaders = headers({
  schema: z.object({ "user_id": z.string().optional() }),
});

const userInfo = fetchDefinition({
  id: 'user-info',
  name: 'User Information',
  trigger: 'initialization',
  fetchConfig: {
    url: `https://api.example.com/users/${supportContextHeaders.toTemplate("user_id")}`,
    method: 'GET'
  },
  responseSchema: z.object({ "name": z.string().optional() }),
  defaultValue: 'Unable to fetch user information',
  credentialReference: agentFabricApiKey
});

export const supportContext = contextConfig({
  id: 'support-context',
  contextVariables: {
    userInfo
  },
  headers: supportContextHeaders
});
