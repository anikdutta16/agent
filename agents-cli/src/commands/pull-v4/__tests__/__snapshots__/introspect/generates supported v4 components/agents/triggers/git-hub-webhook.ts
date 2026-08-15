import { Trigger } from '@agent-fabric/agents-sdk';

export const githubWebhookTrigger = new Trigger({
  id: 'github-webhook',
  name: 'GitHub Webhook',
  enabled: true,
  messageTemplate: 'New webhook event',
});
