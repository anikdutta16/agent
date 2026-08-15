import { credential } from '@agent-fabric/agents-sdk';

export const agentFabricApiKey = credential({
  id: 'agent-fabric-api-key',
  name: 'Agent Fabric API Key',
  type: 'memory',
  credentialStoreId: 'memory-default',
  retrievalParams: {
    key: 'AGENT_FABRIC_API_KEY',
  },
});
