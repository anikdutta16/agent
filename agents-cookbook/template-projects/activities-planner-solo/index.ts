import { project } from '@agent-fabric/agents-sdk';
import { activitiesPlannerSoloAgent } from './agents/activities-planner-solo';

export const activitiesPlannerSolo = project({
  id: 'activities-planner-solo',
  name: 'Activities planner solo',
  description: 'Offline activities planner using local function tools — no network access required',
  models: {
    base: { model: 'anthropic/claude-sonnet-4-5' },
  },
  agents: () => [activitiesPlannerSoloAgent],
});
