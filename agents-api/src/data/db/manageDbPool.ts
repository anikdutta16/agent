import { createAgentsManageDatabasePool } from '@agent-fabric/agents-core';
import { env } from '../../env';

const manageDbPool = createAgentsManageDatabasePool({
  connectionString: env.AGENT_FABRIC_AGENTS_MANAGE_DATABASE_URL,
});

export default manageDbPool;
