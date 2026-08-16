# Core concepts

Learn about the key building blocks of Agent Fabric — Agents, Sub Agents, tools, data components, and more.

## Agents

In Agent Fabric, an **Agent** is the top-level entity you can interface with via conversational experiences (chat) or trigger programmatically (via API).

Under the hood, an Agent is made up of one or more **Sub Agents** that work together to respond to a user or complete a task.

## Tools

When you send a message to an Agent, it is first received by a **Default Sub Agent** that decides what to do next.

In a simple Agent, there may be only one Sub Agent with a few tools available to it.

**Tools** are actions that a Sub Agent can take, like looking up information or performing a task on apps and APIs.

In Agent Fabric, tools can be added to Sub Agents as:

- **MCP Servers**: Connect to external services and APIs via the Model Context Protocol. You can:
  - **Connect to native MCP servers** provided directly by SaaS vendors (no building required)
  - **Access Composio's platform** for 10,000+ out-of-box MCP servers for popular services (no building required)
  - **Use Gram** to convert OpenAPI specs into MCP servers
  - **Build and deploy custom servers** for your own APIs and business logic

  Register any of these with their associated **Credentials** for your Agents to use.

- **Function Tools**: Custom JavaScript functions that Agents can execute directly without the need for standing up an MCP server.

Typically, you want a Sub Agent to handle narrow, well-defined tasks. As a general rule of thumb, keep Sub Agents to be using 5-7 related tools at a time.

## Sub Agent relationships

When your scenario gets complex, it can be useful to break up your logic into multiple Sub Agents that are specialized in specific parts of your task or workflow. This is often referred to as a "multi-agent" system.

A Sub Agent can be configured to:

- **Transfer** control of the chat to another Sub Agent. When a transfer happens, the receiving Sub Agent becomes the primary driver of the thread and can respond to the user directly.
- **Delegate** a subtask for another ('child') Sub Agent to do and wait for its response before proceeding with the next step. A child Sub Agent _cannot_ respond directly to a user.

## Sub Agent 'turn'

When it's a Sub Agent's turn, it can choose to:

1. Send an update message to the user
2. Call a tool to collect information or take an action
3. Transfer or delegate to another Sub Agent

An Agent's execution stays in this loop until one of the Sub Agents chooses to respond to the user with a final result.

> **Note**
> Sub Agents in Agent Fabric are designed to respond to the user as a single, cohesive unit by default.

## Chatting with an Agent

You can talk to an Agent Fabric Agent in a few ways, including:

- **UI Chat Components**: Drop-in React components for chat UIs with built-in streaming and rich UI customization, provided by the `agents-ui` package.
- **As an MCP server**: Use your Agent Fabric Agent as if it were an MCP Server. Allows you to connect it to any MCP client, like Claude, ChatGPT, and other Agents. Exposed as an HTTP JSON-RPC endpoint at `/v1/mcp` with session header management.
- **Via API (Vercel format)**: An API that streams responses over server-sent events (SSE). Use from any language/runtime, including Vercel's `useChat` and AI Element primitives for custom UIs. `POST /api/chat`, `text/event-stream`, `x-vercel-ai-data-stream: v2`.
- **Via API (A2A format)**: An API that follows the Agent-to-Agent ('A2A') JSON-RPC protocol, served at `/agents/a2a` with blocking and streaming modes. Great for combining Agent Fabric with different Agent frameworks that support the A2A format.
- **Via Webhook Triggers**: Create webhook endpoints that allow external services (GitHub, Slack, Stripe, etc.) to invoke your Agents.
- **Slack**: Interact with agents directly in Slack by mentioning `@Agent Fabric` or using `/agent-fabric` slash commands.

## Triggers

**Triggers** are webhook endpoints that allow external services to invoke your Agents. When a webhook is received, the payload is validated, transformed into a message, and used to start a new conversation.

Triggers are useful for:

- **Event-driven workflows** — Respond to events from external services like GitHub, Slack, or Stripe
- **Third-party integrations** — Connect any service that can send HTTP webhooks to your Agents
- **Automated pipelines** — Kick off Agent tasks from CI/CD, cron jobs, or other automation systems

Each trigger can be configured with:

- **Input validation** — JSON Schema to validate incoming payloads
- **Message templates** — Transform webhook payloads into natural language messages using `{{placeholder}}` syntax
- **Authentication** — API keys, bearer tokens, or basic auth to secure the endpoint
- **Signature verification** — HMAC-SHA256 verification for services like GitHub that sign webhooks

When a webhook is received, the trigger creates a new conversation and invokes the Agent asynchronously, returning immediately with an invocation ID for tracking.

## Authentication & API keys

You can authenticate with your Agent using:

- **API Keys**: Securely hashed keys that are scoped to specific Agents
- **Development Mode**: No API key required, perfect for local development and testing
- **Bypass Secrets**: For internal services and infrastructure that need direct access

API keys are the recommended approach for production server-to-server use, providing secure, scoped access to your Agents without exposing secrets to end-users. For app-based integrations such as web clients and authenticated end-user experiences, use App Credentials.

## Agent replies with structured data

Sometimes you want your Agent to reply not in plain text but with specific types of well-defined information, often called 'Structured Outputs' (JSON).

With Agent Fabric, there are a few ways to do this:

- **Data Components**: Structured Outputs that Sub Agents can output in their messages so they can render rich, interactive UIs (lists, buttons, forms, etc.) or convey structured information.
- **Artifacts**: A Sub Agent can save information from a **tool call result** as an artifact. Artifact schemas define **preview fields** (immediately available in the agent's context and streamed to clients) and non-preview fields (persisted in storage but kept out of context by default). Agents can reference artifacts in their responses, pass them to tools for full data access, or retrieve the complete artifact on demand when they need the non-preview fields.
- **Status Updates**: Real-time progress updates that can be plain text or Structured Outputs, used to keep users informed about what the Sub Agent is doing during longer operations.

## Passing context to Sub Agents

Beyond using tools to fetch information, Sub Agents also receive information via:

- **Headers**: In the API request to an Agent, the calling application can include headers for a Sub Agent.
- **Context Fetchers**: Can be configured for an Agent so that at the beginning of a conversation, an API call is automatically made to an external service to get information that is then made available to any Sub Agent. For example, your headers may include a `user-id`, which can be used to auto-fetch information from a CRM about the user for any Sub Agent to use.

Headers and fetched context can then be referenced explicitly as `{{variables}}` in Sub Agent prompts.

## Ways to build

The Visual Builder and TypeScript SDK work seamlessly together — define your Sub Agents in code, push them to the Visual Builder, and iterate visually.

## Projects

You can organize your related MCP Servers, Credentials, Agents, and more into **Projects**. A Project is generally used to represent a set of related scenarios.

For example, you may create one Project for your support team that has all the MCP servers and Agents related to customer support.

## CLI: push and pull

The Agent Fabric CLI bridges your TypeScript SDK project and the Visual Builder.

Run the following from your project (the folder that contains your `agent-fabric.config.ts`) which has an `index.ts` file that exports a project.

- **Push (code → Builder)**: Sync locally defined agents, Sub Agents, tools, and settings from your SDK project into the Visual Builder.

```bash
agent-fabric push
```

- **Pull (Builder → code)**: Fetch your project from the Visual Builder back into your SDK project. By default, the CLI will LLM-assist in updating your local TypeScript files to reflect Builder changes.

```bash
agent-fabric pull
```

> **Note**
> Push and pull operate at the project level (not individual agents). Define agents in your project and push/pull the whole project.

## Deployment

Once you've built your Agents, you can deploy them using:

- **Docker**: Self-host your Agents for full control and flexibility.
- **Vercel**: Deploy your Agents for easy serverless hosting.

## Architecture

The Agent Fabric Agent framework is composed of several key services and libraries that work together:

- **agents-api**: An API that handles configuration of Agents, Sub Agents, MCP Servers, Credentials, and Projects with a REST API.
- **agents-manage-ui**: Visual Builder web interface for creating and managing Agents. Writes to the `agents-api`.
- **agents-sdk**: TypeScript SDK (`@agent-fabric/agents-sdk`) for declaratively defining Agents and custom tools in code. Writes to `agents-api`.
- **agents-cli**: Includes various handy utilities, including `agent-fabric push` and `agent-fabric pull` which sync your TypeScript SDK code with the Visual Builder.
- **agents-ui**: A UI component library of chat interfaces for embedding rich, dynamic conversational AI experiences in web apps.

## Observability

Set up SigNoz to enable full observability with traces and live debugging capabilities for your agents. See `pnpm setup-dev:optional` to bring up the optional tracing stack locally.
