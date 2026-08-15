// Nested API configuration format (new)
export interface ApiConfig {
  /**
   * API endpoint URL
   */
  url: string;
  /**
   * API key
   */
  apiKey?: string;
}

// Flat configuration format (legacy, for backward compatibility)
export interface FlatAgentFabricConfig {
  tenantId: string;
  /**
   * @deprecated Use the nested `agentsApi.url` format instead
   */
  agentsApiUrl: string;
  manageUiUrl?: string;
  outputDirectory?: string;
}

// Nested configuration format (new)
export interface NestedAgentFabricConfig {
  /**
   * Tenant identifier
   */
  tenantId: string;
  /**
   * API configuration
   * @default http://localhost:3002
   */
  agentsApi: ApiConfig;
  /**
   * Management UI URL
   * @default http://localhost:3000
   */
  manageUiUrl?: string;
  /**
   * Output directory for generated files
   */
  outputDirectory?: string;
}

// Union type supporting both formats
export type AgentFabricConfig = FlatAgentFabricConfig | NestedAgentFabricConfig;

export function defineConfig(config: AgentFabricConfig): AgentFabricConfig {
  return config;
}
