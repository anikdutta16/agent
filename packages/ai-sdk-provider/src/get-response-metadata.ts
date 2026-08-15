import type { AgentFabricChatCompletion } from './agent-fabric-chat-prompt';

export function getResponseMetadata(response: AgentFabricChatCompletion) {
  return {
    id: response.id,
    modelId: response.model,
    timestamp: new Date(response.created * 1000),
  };
}
