export type { EvaluationStatus, PassCriteria } from '@agent-fabric/agents-core/evaluation';

import {
  type EvaluationStatus,
  evaluatePassCriteria,
  type PassCriteria,
} from '@agent-fabric/agents-core/evaluation';

export function getEvaluationStatus(
  result: { output?: unknown },
  evaluator: { passCriteria?: PassCriteria | null } | undefined
): EvaluationStatus {
  const outputData =
    ((result.output as Record<string, unknown>)?.output as Record<string, unknown>) ?? {};
  return evaluatePassCriteria(evaluator?.passCriteria, outputData).status;
}
