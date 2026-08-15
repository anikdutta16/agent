#!/usr/bin/env node
/**
 * `@inkeep/agents-ui` and `@inkeep/agents-ui-cloud` are third-party packages
 * published outside this repo, so their package names and exported symbols
 * cannot be rebranded. This restores those identifiers after the rebrand pass.
 *
 * Local imports still use the `@agent-fabric/agents-ui` alias declared in
 * package.json; only the exported symbol names and user-facing install
 * snippets point back at the published names.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const EXPORTS = [
  'AIChatSettings',
  'BaseSettings',
  'CallbackEvent',
  'ChatButtonModalProps',
  'ChatButtonModal',
  'ChatButtonProps',
  'ChatButton',
  'ColorScheme',
  'ComponentInitializer',
  'ComponentInstance',
  'ComponentProps',
  'ConfigProviderProps',
  'ConfigProvider',
  'Config',
  'CustomIcon',
  'EmbeddedChatImplContent',
  'EmbeddedChatImplProps',
  'EmbeddedChatImpl',
  'EmbeddedChatProps',
  'EmbeddedChatProvider',
  'EmbeddedChat',
  'EmbeddedSearchAndChatFunctions',
  'EmbeddedSearchAndChatImplProps',
  'EmbeddedSearchAndChatImpl',
  'EmbeddedSearchAndChatProps',
  'EmbeddedSearchAndChat',
  'EmbeddedSearchImplContent',
  'EmbeddedSearchImplProps',
  'EmbeddedSearchImpl',
  'EmbeddedSearchProps',
  'EmbeddedSearchProvider',
  'EmbeddedSearch',
  'EventWithCommon',
  'Event',
  'Feedback',
  'JSComponent',
  'JS',
  'ModalChatProps',
  'ModalChat',
  'ModalProps',
  'ModalSearchAndChatProps',
  'ModalSearchAndChat',
  'ModalSearchProps',
  'ModalSearch',
  'Modal',
  'SearchBarProps',
  'SearchBar',
  'SearchSettings',
  'Settings',
  'ShadowProps',
  'ShadowProvider',
  'Shadow',
  'SidebarChatProps',
  'SidebarChat',
];

const SYMBOL_FILES = [
  'agents-manage-ui/src/components/agent/copilot/copilot-chat.tsx',
  'agents-manage-ui/src/components/agent/playground/chat-widget.tsx',
  'agents-manage-ui/src/components/agent/ship/chat-ui-guide/chat-ui-code.tsx',
  'agents-manage-ui/src/components/agent/ship/chat-ui-guide/chat-ui-guide.tsx',
  'agents-manage-ui/src/components/agent/ship/chat-ui-guide/chat-ui-preview.tsx',
  'agents-manage-ui/src/components/traces/conversation-transcript.tsx',
  'agents-manage-ui/src/contexts/copilot.tsx',
  'agents-ui-demo/src/App.tsx',
];

// User-facing snippets and scaffolding must reference the published package.
const PACKAGE_SPECIFIER_FILES = [
  'agents-manage-ui/src/components/agent/ship/chat-ui-guide/snippets/react-component.ts',
  'agents-manage-ui/src/components/agent/ship/chat-ui-guide/snippets/react-sidebar-component.ts',
  'agents-manage-ui/src/components/agent/ship/chat-ui-guide/snippets/react-install.ts',
  'packages/create-agents/src/utils.ts',
];

let changed = 0;

for (const rel of SYMBOL_FILES) {
  const path = join(ROOT, rel);
  const original = readFileSync(path, 'utf-8');
  let updated = original;
  for (const name of EXPORTS) {
    updated = updated.replaceAll(`AgentFabric${name}`, `Inkeep${name}`);
  }
  if (updated !== original) {
    writeFileSync(path, updated);
    changed++;
    console.log(`symbols: ${rel}`);
  }
}

for (const rel of PACKAGE_SPECIFIER_FILES) {
  const path = join(ROOT, rel);
  const original = readFileSync(path, 'utf-8');
  const updated = original
    .replaceAll('@agent-fabric/agents-ui-cloud', '@inkeep/agents-ui-cloud')
    .replaceAll('@agent-fabric/agents-ui', '@inkeep/agents-ui');
  if (updated !== original) {
    writeFileSync(path, updated);
    changed++;
    console.log(`specifier: ${rel}`);
  }
}

console.log(`${changed} files restored`);
