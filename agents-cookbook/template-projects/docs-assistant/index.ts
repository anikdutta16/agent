import { project } from '@agent-fabric/agents-sdk';
import { docsAssistantAgent } from './agents/docs-assistant';
import { agentFabricRagMcpTool } from './tools/agent-fabric-rag-mcp';

export const myProject = project({
  id: 'docs-assistant',
  name: 'Docs Assistant',
  description: 'Docs assistant template',
  agents: () => [docsAssistantAgent],
  tools: () => [agentFabricRagMcpTool],
  models: {
    base: { model: 'openai/gpt-4o-mini' },
  },
});
