#!/usr/bin/env node

/**
 * Project Setup Script
 *
 * Usage:
 *   pnpm setup-dev              - Run setup with local Docker database
 *   pnpm setup-dev:cloud        - Run setup for cloud deployment (skips Docker)
 */

import { execSync, spawnSync } from 'node:child_process';
import { loadEnvironmentFiles } from '@agent-fabric/agents-core';
import { runSetup } from '@agent-fabric/agents-core/setup';
import dotenv from 'dotenv';

loadEnvironmentFiles();
dotenv.config();

const projectId = process.env.DEFAULT_PROJECT_ID;
if (!projectId) {
  console.error('DEFAULT_PROJECT_ID environment variable is not set');
  process.exit(1);
}

const isCloud = process.argv.includes('--cloud');

// Cloud mode without bypass secret: ensure CLI profile and login before setup.
// This sets up the cloud API URL (via profile) and credentials (via keychain)
// so that `agent-fabric push` can authenticate against the cloud API.
if (isCloud && !process.env.AGENT_FABRIC_AGENTS_MANAGE_API_BYPASS_SECRET) {
  try {
    execSync('pnpm agent-fabric init --no-interactive', { stdio: 'inherit' });
  } catch {
    console.warn('⚠ Could not set up cloud CLI profile. You may need to run: agent-fabric init');
  }

  try {
    spawnSync('pnpm', ['agent-fabric', 'login'], { stdio: 'inherit', shell: true });
  } catch {
    console.warn('⚠ Could not log in to CLI. You may need to run: agent-fabric login');
  }
}

await runSetup({
  dockerComposeFile: 'docker-compose.db.yml',
  manageMigrateCommand: 'pnpm db:manage:migrate',
  runMigrateCommand: 'pnpm db:run:migrate',
  authInitCommand: 'node node_modules/@agent-fabric/agents-core/dist/auth/init.js',
  upgradeCommand: 'pnpm upgrade-agents',
  pushProject: {
    projectPath: `src/projects/${projectId}`,
    configPath: 'src/agent-fabric.config.ts',
    apiKey: process.env.AGENT_FABRIC_AGENTS_MANAGE_API_BYPASS_SECRET,
  },
  devApiCommand: 'pnpm dev:api',
  devUiCommand: 'pnpm dev:ui',
  apiHealthUrl: 'http://localhost:3002/health',
  uiHealthUrl: 'http://localhost:3000',
  isCloud,
});
