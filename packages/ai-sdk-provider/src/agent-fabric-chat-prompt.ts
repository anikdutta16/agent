export interface AgentFabricChatMessage {
  role: 'system' | 'user' | 'assistant' | 'function' | 'tool';
  content:
    | string
    | Array<{
        type: string;
        text?: string;
      }>;
  name?: string;
}

export interface AgentFabricChatRequest {
  model: string;
  messages: Array<AgentFabricChatMessage>;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  user?: string;
  conversationId?: string;
  tools?: Array<string>;
  runConfig?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

export interface AgentFabricChatCompletionChunk {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model?: string;
  choices: Array<{
    index: number;
    delta: {
      role?: 'assistant';
      content?: string;
      tool_calls?: Array<{
        index: number;
        id?: string;
        type: 'function';
        function: {
          name?: string;
          arguments?: string;
        };
      }>;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export interface AgentFabricChatCompletion {
  id: string;
  object: 'chat.completion';
  created: number;
  model?: string;
  choices: Array<{
    index: number;
    message: {
      role: 'assistant';
      content: string;
      tool_calls?: Array<{
        id: string;
        type: 'function';
        function: {
          name: string;
          arguments: string;
        };
      }>;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export type AgentFabricFinishReason = 'stop' | 'length' | 'tool_calls' | 'content_filter' | null;
