import { createApiError } from '@agent-fabric/agents-core';
import { createMiddleware } from 'hono/factory';
import { env } from '../../env';

export const githubMcpAuth = () =>
  createMiddleware<{
    Variables: {
      toolId: string;
      tenantId: string;
      projectId: string;
    };
  }>(async (c, next) => {
    const toolId = c.req.header('x-agent-fabric-tool-id');
    if (!toolId) {
      throw createApiError({
        code: 'unauthorized',
        message: 'Missing required header: x-agent-fabric-tool-id',
        extensions: {
          parameter: {
            in: 'header',
            name: 'x-agent-fabric-tool-id',
          },
        },
      });
    }

    const tenantId = c.req.header('x-agent-fabric-tenant-id');
    if (!tenantId) {
      throw createApiError({
        code: 'unauthorized',
        message: 'Missing required header: x-agent-fabric-tenant-id',
        extensions: {
          parameter: {
            in: 'header',
            name: 'x-agent-fabric-tenant-id',
          },
        },
      });
    }

    const projectId = c.req.header('x-agent-fabric-project-id');
    if (!projectId) {
      throw createApiError({
        code: 'unauthorized',
        message: 'Missing required header: x-agent-fabric-project-id',
        extensions: {
          parameter: {
            in: 'header',
            name: 'x-agent-fabric-project-id',
          },
        },
      });
    }

    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      throw createApiError({
        code: 'unauthorized',
        message: 'Missing required header: Authorization',
        extensions: {
          parameter: {
            in: 'header',
            name: 'Authorization',
          },
        },
      });
    }

    const apiKey = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

    if (!apiKey) {
      throw createApiError({
        code: 'unauthorized',
        message: 'Invalid Authorization header format. Expected: Bearer <token>',
        extensions: {
          parameter: {
            in: 'header',
            name: 'Authorization',
          },
        },
      });
    }

    if (apiKey !== env.GITHUB_MCP_API_KEY) {
      throw createApiError({
        code: 'unauthorized',
        message: 'Invalid API key',
      });
    }

    c.set('toolId', toolId);
    c.set('tenantId', tenantId);
    c.set('projectId', projectId);
    await next();
  });
