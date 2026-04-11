# Agent Docs Index

Open only the document that matches the task.

## Core docs

1. [`docs/agents/project-overview.md`](docs/agents/project-overview.md) - stack, scope, and related repositories
2. [`docs/agents/repository-map.md`](docs/agents/repository-map.md) - where common code and config live
3. [`docs/agents/cursor-mcp.md`](docs/agents/cursor-mcp.md) - project MCP setup and Vercel MCP notes
4. [`docs/agents/agent-workflow.md`](docs/agents/agent-workflow.md) - how to use rules, skills, and validation
5. [`docs/agents/cv-pdf-docker.md`](docs/agents/cv-pdf-docker.md) - CV PDF dumps, previews, and docx extract via **Docker Compose** (preferred over host Node/Python)
6. [`docs/agents/storybook-ui.md`](docs/agents/storybook-ui.md) - shared DOM UI in `storybook/ui/`, Storybook commands, ESLint boundary

## Rules

- [`.cursor/rules/project-core.mdc`](.cursor/rules/project-core.mdc)
- [`.cursor/rules/nextjs-react.mdc`](.cursor/rules/nextjs-react.mdc) - includes frontend view/logic/style separation and CV PDF styling constraints
- [`.cursor/rules/docker-local.mdc`](.cursor/rules/docker-local.mdc)
- [`.cursor/rules/docker-compose.mdc`](.cursor/rules/docker-compose.mdc)
- [`.cursor/rules/dockerignore.mdc`](.cursor/rules/dockerignore.mdc)
- [`.cursor/rules/github-actions.mdc`](.cursor/rules/github-actions.mdc)
- [`.cursor/rules/vercel-config.mdc`](.cursor/rules/vercel-config.mdc)
- [`.cursor/rules/subagent-plan-review.mdc`](.cursor/rules/subagent-plan-review.mdc)
- [`.cursor/rules/subagent-code-review.mdc`](.cursor/rules/subagent-code-review.mdc)

## Skills

- [`.cursor/skills/docker-local-dev/SKILL.md`](.cursor/skills/docker-local-dev/SKILL.md)
- [`.cursor/skills/vercel-deploy/SKILL.md`](.cursor/skills/vercel-deploy/SKILL.md)
- [`.cursor/skills/ci-github-actions/SKILL.md`](.cursor/skills/ci-github-actions/SKILL.md)
- [`.cursor/skills/nextjs-change-checklist/SKILL.md`](.cursor/skills/nextjs-change-checklist/SKILL.md)
- [`.cursor/skills/storybook-ui/SKILL.md`](.cursor/skills/storybook-ui/SKILL.md)
- [`.cursor/skills/subagent-plan-review/SKILL.md`](.cursor/skills/subagent-plan-review/SKILL.md) — parallel subagents for plan and feature design validation
- [`.cursor/skills/subagent-code-review/SKILL.md`](.cursor/skills/subagent-code-review/SKILL.md) — parallel subagents for code / PR / pre-merge review

## Other references

- [`.cursor/mcp.json`](.cursor/mcp.json)
- [`README.md`](README.md)
