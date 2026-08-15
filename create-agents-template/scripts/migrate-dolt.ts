import { execSync } from 'node:child_process';
import {
  createAgentsManageDatabaseClient,
  doltAddAndCommit,
  doltStatus,
  loadEnvironmentFiles,
} from '@agent-fabric/agents-core';

const commitMigrations = async () => {
  loadEnvironmentFiles();

  try {
    execSync('drizzle-kit migrate --config=drizzle.manage.config.ts', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Error running migrations:', error);
    process.exit(1);
  }

  const db = createAgentsManageDatabaseClient({
    connectionString: process.env.AGENT_FABRIC_AGENTS_MANAGE_DATABASE_URL,
  });

  const status = await doltStatus(db)();
  const statusCount = status.length;

  if (statusCount > 0) {
    await doltAddAndCommit(db)({ message: 'Applied database migrations' });
  } else {
    console.log('ℹ️  No changes to commit - database is up to date\n');
  }
};

commitMigrations();
