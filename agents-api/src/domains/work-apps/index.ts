/**
 * Work Apps Domain
 *
 * Modular integration layer for third-party work applications (Slack, GitHub, etc.)
 * Work app implementations are in @agent-fabric/agents-work-apps package.
 *
 * Each work app is mounted as a sub-route:
 * - /work-apps/slack/* - Slack workspace installation, user linking, commands
 * - /work-apps/github/* - GitHub integration (mounted separately in createApp)
 */

import { slackRoutes, type WorkAppsVariables } from '@agent-fabric/agents-work-apps/slack';
import { OpenAPIHono } from '@hono/zod-openapi';

export function createWorkAppsRoutes() {
  const app = new OpenAPIHono<{ Variables: WorkAppsVariables }>();

  app.route('/slack', slackRoutes);

  return app;
}

export const workAppsRoutes = createWorkAppsRoutes();
