export const AGENT_FABRIC_TOOL_DENIED_KEY = '__agentFabricToolDenied';

export interface DeniedToolResult {
  [AGENT_FABRIC_TOOL_DENIED_KEY]: true;
  toolCallId: string;
  reason?: string;
}

export function isToolResultDenied(result: unknown): result is DeniedToolResult {
  return (
    !!result &&
    typeof result === 'object' &&
    AGENT_FABRIC_TOOL_DENIED_KEY in result &&
    result[AGENT_FABRIC_TOOL_DENIED_KEY] === true
  );
}

export function createDeniedToolResult(toolCallId: string, reason?: string): DeniedToolResult {
  return {
    [AGENT_FABRIC_TOOL_DENIED_KEY]: true,
    toolCallId,
    reason,
  };
}
