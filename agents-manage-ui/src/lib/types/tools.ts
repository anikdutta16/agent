// Export the core McpTool type for convenience
import type { McpTool as Tool } from '@agent-fabric/agents-core';
import type { WithTimestamps } from '@agent-fabric/agents-core/client-exports';

export type MCPTool = WithTimestamps<Tool>;
