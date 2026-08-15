import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle config for the Manage database (DoltgreSQL - versioned)
 * Contains: projects, agents, tools, contextConfigs, etc.
 */
export default defineConfig({
  schema: 'node_modules/@agent-fabric/agents-core/dist/db/manage/manage-schema.js',
  out: 'node_modules/@agent-fabric/agents-core/drizzle/manage',
  dbCredentials: {
    url: process.env.AGENT_FABRIC_AGENTS_MANAGE_DATABASE_URL ?? '',
  },
  dialect: 'postgresql',
});
