---
name: ci-github-actions
description: >-
  Interprets and fixes GitHub Actions CI for this repo: yarn installs, lint,
  test, and Next.js build. Use when workflows fail, when adding CI checks, or
  when aligning Node/yarn versions with local Docker and Vercel.
---

# GitHub Actions CI

## Locate workflows

- Primary path: `.github/workflows/*.yml` (or `.yaml`).
- Read job names and triggers (`on:` push, pull_request, workflow_dispatch).

## Standard alignment

- **Package manager**: Use **yarn** in CI (`yarn install --frozen-lockfile` when `yarn.lock` exists; otherwise follow lockfile policy the repo uses).
- **Node version**: Match `package.json` `engines`, `.nvmrc`, or `.node-version` if present; otherwise use active LTS and document changes.
- **Steps order**: checkout → setup Node → cache yarn (optional) → install → lint → typecheck → test → build (skip stages that do not exist yet).
- **Modular CI** (this repo): Workflows are **per package/concern** (`.github/workflows/ci-frontend.yml`, `ci-resume-content.yml`, `ci-storybook.yml`, `ci-e2e.yml`). Each job builds the **`frontend`** Docker image then runs **`docker compose run --rm frontend …`** with **`yarn`** scoped to **`apps/frontend`**, **`packages/storybook`**, **`packages/resume-content`**, or **`apps/e2e`** (see YAML for exact commands). **Production image** is **`ci-build.yml`** (`docker compose --profile prod build frontend-prod`). Prefer **new jobs scoped to one package** when adding checks so unrelated packages do not false-fail each other.

## Fixing failures

1. Reproduce locally with the **same commands** as the failing step.
2. For **lockfile drift**: regenerate `yarn.lock` with intentional dependency changes only; avoid unrelated upgrades.
3. For **flaky tests**: prefer fixing root cause over `retry:` unless the repo already uses retries for known flakes.

## Adding a new check

- Add a `package.json` script first when possible, then call that script from CI for a single source of truth.
- Keep workflow YAML readable: one job per concern or clear `needs:` DAG for deploy jobs.

## Done when

- Workflow files are valid YAML and pass `act` / GHA (or the user confirms a green run).
- New jobs document required secrets in workflow comments or `AGENTS.md`, not in plaintext values.
