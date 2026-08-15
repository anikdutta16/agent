# @agent-fabric/agents-cli

CLI for working with the Agent Fabric.

## Install

```bash
npm install -g @agent-fabric/agents-cli
# or
pnpm add -g @agent-fabric/agents-cli
```

The executable command is `agent-fabric`.

## Docs

- CLI overview: <https://localhost/guides/cli/overview>
- CLI reference: <https://localhost/typescript-sdk/cli-reference>
- Push guide: <https://localhost/guides/cli/push-to-remote>
- Pull guide: <https://localhost/guides/cli/pull-from-remote>
- Profile setup: <https://localhost/guides/cli/setup-profile>

## Quick usage

```bash
agent-fabric init
agent-fabric push
agent-fabric pull
agent-fabric list-agent --project <project-id>
```

## Local development

```bash
pnpm install
pnpm build
npm link
agent-fabric --version
```

## Contributing

Run from `agents-cli/`:

```bash
pnpm lint
pnpm typecheck
pnpm test --run
```
