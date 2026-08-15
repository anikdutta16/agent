import { getTracer } from '@agent-fabric/agents-core';

// Pre-configured tracer for agents-run-api
export const tracer = getTracer('agents-run-api');

export { setSpanWithError } from '@agent-fabric/agents-core';
