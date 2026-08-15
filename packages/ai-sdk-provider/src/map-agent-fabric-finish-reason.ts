import type { LanguageModelV2FinishReason } from '@ai-sdk/provider';
import type { AgentFabricFinishReason } from './agent-fabric-chat-prompt';

export function mapAgentFabricFinishReason(
  finishReason: AgentFabricFinishReason
): LanguageModelV2FinishReason {
  switch (finishReason) {
    case 'stop':
      return 'stop';
    case 'length':
      return 'length';
    case 'tool_calls':
      return 'tool-calls';
    case 'content_filter':
      return 'content-filter';
    case null:
      return 'unknown';
    default:
      return 'unknown';
  }
}
