import { agent, subAgent } from '@agent-fabric/agents-sdk';
import { agentFabricRagMcpTool } from '../tools/agent-fabric-rag-mcp';

/**
 * Docs Assistant Agent
 *
 * This agent is responsible for answering questions about Agent Fabric documentation.
 */

const docsAssistant = subAgent({
  id: 'docs-assistant',
  name: 'Docs Assistant',
  description: 'A agent that can answer questions about Agent Fabric documentation',
  prompt: `You are a helpful assistant that answers questions about the documentation.
    Use the Agent Fabric RAG MCP tool to find relevant information.`,
  canUse: () => [agentFabricRagMcpTool],
});

export const docsAssistantAgent = agent({
  id: 'docs-assistant',
  name: 'Docs Assistant',
  description: 'A agent that can answer questions about the documentation',
  defaultSubAgent: docsAssistant,
  subAgents: () => [docsAssistant],
});
