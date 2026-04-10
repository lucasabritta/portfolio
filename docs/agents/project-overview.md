# Project Overview

## Scope

This repository contains the portfolio site. Do not assume shared frontend, backend, or AI pipeline packages exist here unless they are present in this tree.

Related product work may live in separate repositories:

- Frontend code lives in the Frontend repository.
- Backend code lives in the Backend repository.
- Most AI orchestration code lives in the `vectorization_pipeline` repository.

## Intended stack

| Area | Choice |
|------|--------|
| Framework | Next.js App Router with stable React |
| Package manager | `yarn` |
| Local development | Docker-first via `Dockerfile` and `compose*.yml` |
| CI | GitHub Actions in `.github/workflows/` |
| Production deploy | Vercel-native deployment |

## Working defaults

- Use `yarn`, not `npm` or `pnpm`.
- Prefer Server Components by default and add `"use client"` only when needed.
- Keep changes focused and avoid unrelated refactors.
