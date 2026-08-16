/**
 * Adapter for the third-party chat UI package.
 *
 * The package is published under its own scope and exports its components
 * with an `Inkeep` prefix, so those names cannot be changed. It is consumed
 * through an npm alias (see this package's `package.json`) and re-exported
 * here under Agent Fabric names. Import chat widgets from this module rather
 * than from `@agent-fabric/agents-ui` directly, so the upstream names stay
 * confined to this file.
 */
export {
  InkeepChatButton as AgentFabricChatButton,
  InkeepEmbeddedChat as AgentFabricEmbeddedChat,
  InkeepSidebarChat as AgentFabricSidebarChat,
} from '@agent-fabric/agents-ui';
export type {
  InkeepAIChatSettings as AgentFabricAIChatSettings,
  InkeepBaseSettings as AgentFabricBaseSettings,
} from '@agent-fabric/agents-ui/types';
