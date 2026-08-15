import { agent } from '@agent-fabric/agents-sdk';
import { agentFabricQaContext } from '../context-configs/agent-fabric-qa-context';
import { qa } from './sub-agents/qa';

export const agentFabricQaGraph = agent({
  id: 'agent-fabric-qa-graph',
  name: 'Agent Fabric QA Graph',
  description: 'Customer Support Graph with Agent Fabric Facts',
  prompt: `You are a customer support agent for ${agentFabricQaContext.toTemplate('projectDescription.chatSubjectName')}. You only speak to customers and do not speak to members of the team. You are the team, you must always respond to the customer's question from the perspective of the team.`,
  defaultSubAgent: qa,
  subAgents: () => [qa],
  contextConfig: agentFabricQaContext,
  statusUpdates: {
    numEvents: 1,
    timeInSeconds: 1,
  },
});
