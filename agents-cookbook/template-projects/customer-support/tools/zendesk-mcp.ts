import { mcpTool } from '@agent-fabric/agents-sdk';

export const zendeskMcpTool = mcpTool({
  id: 'zendesk-mcp',
  name: 'Zendesk',
  serverUrl: 'https://zendesk-mcp-sand.vercel.app/mcp',
});
