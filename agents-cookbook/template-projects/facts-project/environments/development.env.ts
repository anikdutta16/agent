import { registerEnvironmentSettings } from '@agent-fabric/agents-sdk';
import { agentFabricApiKey } from '../credentials/agent-fabric-api-key';

export const development = registerEnvironmentSettings({
  credentials: {
    agentFabricApiKey: agentFabricApiKey,
  },
});
