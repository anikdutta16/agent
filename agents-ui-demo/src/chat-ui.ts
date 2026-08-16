/**
 * Adapter for the third-party chat UI package.
 *
 * The package exports its components with an `Inkeep` prefix, which cannot be
 * changed. It is consumed through an npm alias (see `package.json`) and
 * re-exported here under Agent Fabric names, so the upstream names stay
 * confined to this file.
 */
export {
  InkeepChatButton as AgentFabricChatButton,
  InkeepEmbeddedChat as AgentFabricEmbeddedChat,
  InkeepSidebarChat as AgentFabricSidebarChat,
} from '@agent-fabric/agents-ui';
