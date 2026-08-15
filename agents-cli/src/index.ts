#!/usr/bin/env node
import './env'; // Load environment files first (needed by instrumentation)
import './instrumentation'; // Initialize Langfuse tracing second

// Silence config loading logs for cleaner CLI output
import { getLogger } from '@agent-fabric/agents-core';

const configLogger = getLogger('config');
configLogger.updateOptions({ level: 'silent' });

import { createProgram } from './program';

const program = createProgram();
program.parse();
