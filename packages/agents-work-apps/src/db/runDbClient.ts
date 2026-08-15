import { createAgentsRunDatabaseClient } from '@agent-fabric/agents-core';
import { env } from '../env';

const runDbClient = createAgentsRunDatabaseClient({
  connectionString: env.AGENT_FABRIC_AGENTS_RUN_DATABASE_URL,
});

export default runDbClient;
