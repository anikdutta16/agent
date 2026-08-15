import { env } from '../../../../env';

export function isPromptCachingEnabled(): boolean {
  // AGENT_FABRIC_PROMPT_CACHING_ENABLED is parsed to a boolean at the env schema boundary
  // (z.stringbool, default true), so this is a plain boolean check.
  return env.AGENT_FABRIC_PROMPT_CACHING_ENABLED !== false;
}
