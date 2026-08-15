#!/usr/bin/env node
/**
 * Rebrand agent-fabric/agents -> Agent Fabric.
 *
 * Replacements are ordered so that identifier-shaped occurrences (PascalCase,
 * camelCase, SCREAMING_SNAKE) are rewritten without introducing spaces, which
 * would produce invalid syntax. Only standalone word occurrences become the
 * display form "Agent Fabric".
 *
 * Idempotent: safe to run repeatedly.
 */

import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  '.turbo',
  'dist',
  'build',
  '.next',
  'coverage',
  '.blob-storage',
]);

const SKIP_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.icns',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.zip',
  '.gz',
  '.pdf',
  '.mp4',
  '.webm',
]);

const RULES = [
  // --- URLs, emails, repo paths (before any generic brand rule) ---
  [/https?:\/\/agent-fabric\.com\/images\/logos\/agent-fabric-logo-blue\.svg/g, '/logo.svg'],
  [/https?:\/\/agent-fabric\.com\/cloud-waitlist/g, '#'],
  [/https?:\/\/agent-fabric\.com\/enterprise/g, '#'],
  [/github\.com\/agent-fabric\/agents/g, 'github.com/agent-fabric/agents'],
  [/api\.agents\.agent-fabric\.com/g, 'api.localhost'],
  [/docs\.agent-fabric\.com/g, 'localhost'],
  [/challenges-staging\.agent-fabric\.com/g, 'localhost'],
  [/challenges\.agent-fabric\.com/g, 'localhost'],
  [/updates\.agent-fabric\.com/g, 'localhost'],
  [/support@agent-fabric\.com/g, 'support@agent-fabric.local'],
  [
    /registry\.speakeasyapi\.dev\/agent-fabric\/agent-fabric/g,
    'registry.speakeasyapi.dev/agent-fabric/agent-fabric',
  ],
  [/https?:\/\/agent-fabric\.com/g, 'http://localhost'],
  [/agent-fabric\.com/g, 'localhost'],

  // --- npm scope ---
  [/@agent-fabric\//g, '@agent-fabric/'],

  // --- SCREAMING_SNAKE constants and env vars ---
  [/NEXT_PUBLIC_AGENT_FABRIC_/g, 'NEXT_PUBLIC_AGENT_FABRIC_'],
  [/PUBLIC_AGENT_FABRIC_/g, 'PUBLIC_AGENT_FABRIC_'],
  [/AGENT_FABRIC_/g, 'AGENT_FABRIC_'],
  [/AGENTFABRICAGENTS/g, 'AGENTFABRICAGENTS'],
  [/AGENT FABRIC/g, 'AGENT FABRIC'],
  [/AGENTFABRIC/g, 'AGENTFABRIC'],

  // --- hyphen/underscore compounds (safe: already delimited) ---
  [/agent-fabric-/g, 'agent-fabric-'],
  [/agent-fabric/g, 'agent-fabric'],
  [/agent_fabric/g, 'agent_fabric'],
  [/x-agent-fabric-/g, 'x-agent-fabric-'],
  [/agent-fabric\.config/g, 'agent-fabric.config'],
  [/~\/\.agent-fabric/g, '~/.agent-fabric'],
  [/\.agent-fabric\//g, '.agent-fabric/'],
  [/agent-fabric-/g, 'agent-fabric-'],
  [/-agent-fabric/g, '-agent-fabric'],

  // --- identifier-shaped occurrences (no spaces allowed) ---
  // PascalCase: AgentFabricConfig -> AgentFabricConfig, FooAgentFabric -> FooAgentFabric
  [/Agent Fabric(?=[A-Za-z0-9_])/g, 'AgentFabric'],
  [/(?<=[A-Za-z0-9_])Agent Fabric/g, 'AgentFabric'],
  // camelCase / glued lowercase: agentFabricGong -> agentFabricGong, agentFabricgong -> agentFabricgong
  [/agent-fabric(?=[A-Za-z0-9_])/g, 'agentFabric'],
  [/(?<=[A-Za-z0-9_])agent-fabric/g, 'AgentFabric'],

  // --- standalone display / lowercase brand ---
  [/Agent Fabric/g, 'Agent Fabric'],
  [/Agent Fabric/g, 'Agent Fabric'],
  [/Agent Fabric Open Source/g, 'Agent Fabric Open Source'],
  [/Agent Fabric Cloud/g, 'Agent Fabric Cloud'],
  [/Agent Fabric Enterprise/g, 'Agent Fabric Enterprise'],
  [/Agent Fabric CLI/g, 'Agent Fabric CLI'],
  [/Agent Fabric/g, 'Agent Fabric'],
  [/agent-fabric/g, 'agent-fabric'],
];

function isTextCandidate(path) {
  const dot = path.lastIndexOf('.');
  const ext = dot === -1 ? '' : path.slice(dot);
  return !SKIP_EXTENSIONS.has(ext);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (isTextCandidate(full)) out.push(full);
  }
  return out;
}

function rewrite(content) {
  let out = content;
  for (const [pattern, replacement] of RULES) out = out.replace(pattern, replacement);
  return out;
}

let changedFiles = 0;
for (const file of walk(ROOT)) {
  let original;
  try {
    original = readFileSync(file, 'utf-8');
  } catch {
    continue;
  }
  if (!original.toLowerCase().includes('agent-fabric')) continue;
  const updated = rewrite(original);
  if (updated !== original) {
    writeFileSync(file, updated);
    changedFiles++;
  }
}
console.log(`Content: ${changedFiles} files updated`);

const renames = [];
(function collect(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collect(full);
    else if (entry.includes('agent-fabric')) {
      renames.push({ from: full, to: join(dir, entry.replace(/agent-fabric/g, 'agent-fabric')) });
    }
  }
})(ROOT);

for (const { from, to } of renames) {
  renameSync(from, to);
  console.log(`Renamed ${from.slice(ROOT.length)} -> ${to.slice(ROOT.length)}`);
}
console.log(`Renames: ${renames.length} files`);
