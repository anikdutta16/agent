import { mcpTool } from '@agent-fabric/agents-sdk';

export const knowledgeBaseMcpTool = mcpTool({
  id: 'knowledge-base-mcp',
  name: 'Knowledge Base MCP',
  serverUrl: 'https://mcp.localhost/agent-fabric/mcp',
  imageUrl: 'https://cdn-icons-png.flaticon.com/512/12535/12535014.png',
});
