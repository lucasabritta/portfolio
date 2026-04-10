---
name: docker-local-dev
description: >-
  Runs and debugs the portfolio app locally using Docker or Docker Compose.
  Use when the user asks to run the app in Docker, fix compose errors, expose
  ports, or align container commands with Next.js. Use when editing Dockerfile
  or docker-compose files and verifying the stack starts.
---

# Docker-first local development

## Before you start

- Read `AGENTS.md` and any `README.md` sections that document compose service names and ports.
- Confirm **Docker Desktop** (or compatible engine) is running on the machine.

## Default procedure

1. **Discover entrypoints**: Locate `Dockerfile`, `docker-compose.yml` / `docker-compose.yaml`, and `.env.example` (if present).
2. **Environment**: Copy `.env.example` → `.env` or `.env.local` as documented; never invent secret values—ask the user for missing credentials.
3. **Build**: `docker compose build` (or `docker-compose build` if the repo uses v1 syntax—match existing docs).
4. **Run**: `docker compose up` (add `-d` for detached). Watch logs for the Next.js ready URL.
5. **Verify**: Open the documented host/port (often `http://localhost:3000`). If the container binds `0.0.0.0`, that matches external access from the host.

## Troubleshooting

- **Port conflicts**: Change the host port in compose or stop the conflicting process; document the chosen port if you change it.
- **Stale volumes**: After dependency or lockfile changes, `docker compose build --no-cache` or remove anonymous volumes per team practice.
- **ARM vs x86**: If base images fail on Apple Silicon, prefer official images with `linux/arm64` support or explicit platform flags only when the repo already uses them.

## Done when

- Containers start without error and the app responds on the documented URL.
- Any new env vars are reflected in `.env.example` and mentioned in `README.md` or `AGENTS.md` if agents need them.
