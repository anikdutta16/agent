# Agent Fabric

Build AI Agents with a **No-Code Visual Builder** or **TypeScript SDK**. Agents can be edited in either with **full 2-way sync**, so technical and non-technical teams can create and manage Agents in one platform. 

Get started by running the stack locally:

```bash
pnpm install
pnpm setup-dev   # starts Doltgres, Postgres, and SpiceDB in Docker, runs migrations, seeds an admin user
pnpm dev         # API on http://localhost:3002, Visual Builder on http://localhost:3000
```

Requires Node >= 22.18, pnpm, and a running Docker daemon.

## Two ways to build

### No-Code Visual Builder

A drag-and-drop canvas so any team can create and own the Agents they care about.

### TypeScript Agents SDK

A code-first framework so engineering teams can build with typesafety, intellisense, CI/CD, and the tools they expect.

```typescript
import { agent, subAgent } from "@agent-fabric/agents-sdk";
import { consoleMcp } from "./mcp";

const helloAgent = subAgent({
  id: "hello-agent",
  name: "Hello Agent",
  description: "Says hello",
  canUse: () => [consoleMcp], 
  prompt: `Reply to the user and console log "hello world" with fun variations like h3llo world`,
});

export const basicAgent = agent({
  id: "basic-agent",
  name: "Basic Agent",
  description: "A basic agent",
  defaultSubAgent: helloAgent,
  subAgents: () => [helloAgent],
});
```

The **Visual Builder and TypeScript SDK are fully interoperable**: technical and non-technical teams can edit and manage Agents in either format and collaborate with others at any time.

## Use Cases

Agent Fabric can operate as real-time **AI Chat Assistants**, for example:
- a customer experience agent for help centers, technical docs, or in-app experiences
- an internal copilot to assist your support, sales, marketing, ops, and other teams

Agents can also be used for **AI Workflow Automation** like:
- Creating and updating knowledge bases, documentation, and blogs
- Updating CRMs, triaging helpdesk tickets, and tackling repetitive tasks

## Platform Overview

**Agent Fabric Open Source** includes:
- A Visual Builder & TypeScript SDK with 2-way sync
- Multi-agent architecture to support teams of agents
- MCP Tools with credential management
- A UI component library for dynamic chat experiences
- Triggering Agents via MCP, A2A, & Vercel SDK APIs
- Observability via a Traces UI & OpenTelemetry
- Easy deployment using Vercel or Docker

## Architecture

The Agent Fabric Agent Platform is composed of several key services and libraries that work together:

- **agents-api**: An API that handles configuration of Agents, Sub Agents, MCP Servers, Credentials, and Projects with a REST API. Additionally, it exposes Agent execution and evaluation. The API tracks conversation state and emits OTEL traces.
- **agents-manage-ui**: Visual Builder web interface for creating and managing Agents. Writes to the `agents-api`.
- **agents-sdk**: TypeScript SDK (`@agent-fabric/agents-sdk`) for declaratively defining Agents and custom tools in code. Writes to `agents-api`.
- **agents-cli**: Includes various handy utilities, including `agent-fabric push` and `agent-fabric pull` which sync your TypeScript SDK code with the Visual Builder.
- **agents-ui**: A UI component library of chat interfaces for embedding rich, dynamic conversational AI experiences in web apps.

Under the hood, the framework uses the [Vercel AI SDK](https://ai-sdk.dev/docs/introduction) for interfacing with LLM providers, so it's compatible with Vercel's [`useChat`](https://ai-sdk.dev/docs/ai-sdk-ui) hook and other AI primatives.