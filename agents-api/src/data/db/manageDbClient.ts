import { createAgentsManageDatabaseClient } from '@agent-fabric/agents-core';
import { env } from '../../env';

const manageDbClient = createAgentsManageDatabaseClient({
  connectionString: env.AGENT_FABRIC_AGENTS_MANAGE_DATABASE_URL,
});

export default manageDbClient;
