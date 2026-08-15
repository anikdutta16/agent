import { mcpTool } from '@agent-fabric/agents-sdk';

export const agentFabricFacts = mcpTool({
  id: 'agentFabric_facts',
  name: 'agentFabric_facts',
  serverUrl: 'https://mcp.localhost/agent-fabric/mcp',
  activeTools: ['search-agent-fabric-docs'],
});
