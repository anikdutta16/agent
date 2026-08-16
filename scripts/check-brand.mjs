#!/usr/bin/env node

// Fails if the upstream brand name appears in tracked source files.
//
// This fork is branded "Agent Fabric" end to end. The only permitted
// occurrences are the ones listed in ALLOWED below, each of which points at a
// third-party npm package whose published name and exported symbols are not
// ours to rename. Everything else must use Agent Fabric naming.
//
// Usage: node scripts/check-brand.mjs

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const NEEDLE = /inkeep/i;

// Paths that may reference the third-party package, with the reason why.
// Do not add entries here for your own code — rename it instead.
const ALLOWED = new Map([
  ['agents-manage-ui/package.json', 'npm alias to the published chat UI package'],
  ['agents-ui-demo/package.json', 'npm alias to the published chat UI package'],
  [
    'agents-manage-ui/src/lib/chat-ui.ts',
    'adapter that re-exports the widgets under Agent Fabric names',
  ],
  ['agents-ui-demo/src/chat-ui.ts', 'adapter that re-exports the widgets under Agent Fabric names'],
  [
    'agents-manage-ui/src/lib/widget-styles.ts',
    'CSS selector that hides the upstream "Powered by" link',
  ],
  [
    'agents-manage-ui/src/components/agent/ship/chat-ui-guide/chat-ui-code.tsx',
    'component names substituted into user-facing install snippets',
  ],
  [
    'agents-manage-ui/src/components/agent/ship/chat-ui-guide/snippets/react-component.ts',
    'user-facing snippet must name the real npm package',
  ],
  [
    'agents-manage-ui/src/components/agent/ship/chat-ui-guide/snippets/react-sidebar-component.ts',
    'user-facing snippet must name the real npm package',
  ],
  [
    'agents-manage-ui/src/components/agent/ship/chat-ui-guide/snippets/react-install.ts',
    'user-facing snippet must name the real npm package',
  ],
  ['packages/create-agents/src/utils.ts', 'published name of the divergent chat UI package'],
  [
    'scripts/fix-external-ui-package-names.mjs',
    'restores the external package names after a rebrand pass',
  ],
  ['scripts/check-brand.mjs', 'this checker'],
  ['pnpm-lock.yaml', 'resolutions for the aliased package'],
]);

const SKIP_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.webp',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.pdf',
  '.mp4',
  '.zip',
]);

// Includes untracked-but-not-ignored files so a new file is caught before it
// is ever committed.
function candidateFiles() {
  const output = execFileSync('git', ['ls-files', '-zco', '--exclude-standard'], {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
  });
  return [...new Set(output.split('\0').filter(Boolean))];
}

const violations = [];
const usedAllowances = new Set();

for (const file of candidateFiles()) {
  if (SKIP_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;

  const absolute = path.join(ROOT_DIR, file);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) continue;

  const lines = fs.readFileSync(absolute, 'utf-8').split('\n');
  const hits = lines
    .map((text, index) => ({ line: index + 1, text: text.trim() }))
    .filter(({ text }) => NEEDLE.test(text));

  if (hits.length === 0) continue;

  if (ALLOWED.has(file)) {
    usedAllowances.add(file);
    continue;
  }

  violations.push({ file, hits });
}

if (violations.length > 0) {
  console.error('Upstream brand name found in files that should use Agent Fabric naming:\n');
  for (const { file, hits } of violations) {
    for (const { line, text } of hits) {
      console.error(`  ${file}:${line}: ${text.slice(0, 100)}`);
    }
  }
  console.error(
    '\nRename these to Agent Fabric. If a reference is genuinely required by a\n' +
      'third-party package, import it through an adapter module instead, or add the\n' +
      'path to ALLOWED in scripts/check-brand.mjs with a reason.'
  );
  process.exit(1);
}

const stale = [...ALLOWED.keys()].filter((file) => !usedAllowances.has(file));
if (stale.length > 0) {
  console.error('Stale entries in ALLOWED — these no longer contain the name, so remove them:\n');
  for (const file of stale) console.error(`  ${file}`);
  process.exit(1);
}

console.log(`Brand check passed — ${usedAllowances.size} allowed third-party reference(s).`);
