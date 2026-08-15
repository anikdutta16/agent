import { loadSetting, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { AgentFabricChatLanguageModel } from './agent-fabric-chat-language-model';
import type { AgentFabricChatOptions } from './agent-fabric-chat-options';

export interface AgentFabricProvider {
  (options?: AgentFabricChatOptions): AgentFabricChatLanguageModel;

  languageModel(options?: AgentFabricChatOptions): AgentFabricChatLanguageModel;
}

export interface AgentFabricProviderSettings {
  baseURL?: string;
  apiKey?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

export function createAgentFabric(options: AgentFabricProviderSettings = {}): AgentFabricProvider {
  const getBaseURL = (): string => {
    const baseURL = loadSetting({
      settingValue: options.baseURL,
      environmentVariableName: 'AGENT_FABRIC_AGENTS_RUN_API_URL',
      settingName: 'baseURL',
      description: 'Agent Fabric API base URL',
    });
    return withoutTrailingSlash(baseURL) as string;
  };

  const getHeaders = () => {
    // API key is optional for development use cases (e.g., localhost)
    const apiKey = options.apiKey;
    return {
      Authorization: apiKey ? `Bearer ${apiKey}` : undefined,
      ...options.headers,
    };
  };

  const createChatModel = (chatOptions?: AgentFabricChatOptions) =>
    new AgentFabricChatLanguageModel(chatOptions ?? {}, {
      provider: 'agent-fabric',
      baseURL: getBaseURL(),
      headers: getHeaders,
      fetch: options.fetch,
    });

  const provider = (chatOptions?: AgentFabricChatOptions) => createChatModel(chatOptions);

  provider.languageModel = createChatModel;

  return provider as AgentFabricProvider;
}

export const agentFabric = createAgentFabric();
