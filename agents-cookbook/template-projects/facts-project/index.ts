import { project } from '@agent-fabric/agents-sdk';
import { agentFabricQaGraph } from './agents/agent-fabric-qa-graph';
import { citation } from './artifact-components/citation';
import { agentFabricApiKey } from './credentials/agent-fabric-api-key';
import { agentFabricFacts } from './tools/agent-fabric-facts';

export const factsProject = project({
  id: 'facts-project',
  name: 'facts-project',
  description: 'project is for facts...',
  models: {
    base: {
      model: 'anthropic/claude-sonnet-4-5',
    },
  },
  agents: () => [agentFabricQaGraph],
  tools: () => [agentFabricFacts],
  artifactComponents: () => [citation],
  credentialReferences: () => [agentFabricApiKey],
});
