import { createEnvironmentSettings } from '@agent-fabric/agents-sdk';
import { development } from './development.env';

export const envSettings = createEnvironmentSettings({
  development,
});
