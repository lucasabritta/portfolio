# syntax=docker/dockerfile:1

ARG NODE_IMAGE=public.ecr.aws/docker/library/node:22-bookworm-slim

FROM ${NODE_IMAGE} AS deps
WORKDIR /workspace
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/frontend/yarn.lock ./apps/frontend/yarn.lock
COPY packages/resume-content ./packages/resume-content
COPY packages/storybook ./packages/storybook
WORKDIR /workspace/apps/frontend
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked \
  yarn install --frozen-lockfile
# Storybook config imports `vite` from `packages/storybook/.storybook/main.ts`; Node must resolve it
# under `packages/storybook/node_modules` (not only hoisted under `apps/frontend/node_modules`).
WORKDIR /workspace/packages/storybook
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked \
  yarn install --frozen-lockfile
WORKDIR /workspace/apps/frontend
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
RUN mkdir -p /ms-playwright && yarn playwright install chromium --with-deps

FROM deps AS development
WORKDIR /workspace
ENV NEXT_TELEMETRY_DISABLED=1
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
COPY . .
WORKDIR /workspace/apps/frontend
EXPOSE 3000 6006
CMD ["yarn", "dev:docker"]

FROM ${NODE_IMAGE} AS builder
WORKDIR /workspace
ENV NEXT_TELEMETRY_DISABLED=1
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
COPY --from=deps /workspace/apps/frontend/node_modules ./apps/frontend/node_modules
COPY . .
COPY --from=deps /workspace/packages/storybook/node_modules ./packages/storybook/node_modules
WORKDIR /workspace/apps/frontend
# Refresh file: workspace packages after full COPY (deps layer node_modules can be stale vs packages/*).
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked \
  yarn install --frozen-lockfile
RUN yarn build

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder /workspace/apps/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/frontend/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
