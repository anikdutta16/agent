import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle config for the Runtime database (PostgreSQL - unversioned)
 * Contains: conversations, messages, tasks, apiKeys, Better Auth tables, etc.
 */
export default defineConfig({
  schema: 'node_modules/@agent-fabric/agents-core/dist/db/runtime/runtime-schema.js',
  out: 'node_modules/@agent-fabric/agents-core/drizzle/runtime',
  dbCredentials: {
    url: process.env.AGENT_FABRIC_AGENTS_RUN_DATABASE_URL ?? '',
  },
  dialect: 'postgresql',
});
