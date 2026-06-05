---
name: analytics-posthog
description: >-
  Implements and validates cookieless PostHog analytics in apps/frontend: trackEvent API,
  event registry, AnalyticsProvider, /ingest proxy, and privacy guardrails. Use when adding
  PostHog, analytics events, cookieless tracking, or product metrics to the portfolio site.
---

# PostHog cookieless analytics

Read [ADR 0005](../../../docs/adr/0005-cookieless-posthog-analytics.md) first.

## Where code lives

| Area | Path |
| ---- | ---- |
| Event names | `apps/frontend/lib/analytics/events.ts` |
| DOM context + sanitization | `apps/frontend/lib/analytics/properties.ts` |
| Click → event mapping | `apps/frontend/lib/analytics/event-registry.ts` |
| Public API | `trackEvent()` in `apps/frontend/lib/analytics/track.ts` |
| Init + provider | `posthog-client.ts`, `app/_shell/analytics-provider.tsx` |

**Never** add PostHog, `track` props, or `data-analytics-*` in `packages/storybook`. Storybook may add presentational `id` anchors only when the FE cannot resolve location from existing landmarks.

## Add a custom event

1. **Imperative** (theme change, error boundary, page view): call `trackEvent(ANALYTICS_EVENTS.myEvent, { ... })` from an `apps/frontend` client module.
2. **Link/button click**: extend `resolveClickEvent` / `event-registry.ts` using `resolveLocation(el, pathname)` — do not edit Storybook components.

## Init contract (do not weaken)

```typescript
posthog.init(key, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  cookieless_mode: "always",
  capture_pageview: false,
  autocapture: false,
  disable_session_recording: true,
  disable_surveys: true,
  respect_dnt: true,
  persistence: "memory",
});
```

- Never call `posthog.identify()`.
- Never emit email, phone, or raw mailto/tel in properties.

## PostHog project + Vercel setup

1. PostHog Cloud **EU** project.
2. Enable **Cookieless server hash mode** (Project settings → Web analytics).
3. Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel **Production** only.
4. After deploy, confirm Cloudflare does not cache `/ingest/*` POSTs.

## Validation (Docker)

```bash
docker compose run --rm frontend yarn --cwd apps/frontend test:unit
docker compose run --rm frontend yarn --cwd apps/frontend lint
docker compose run --rm frontend yarn --cwd apps/frontend typecheck
```

Also run `nextjs-change-checklist` for substantive app changes.

## Done when

- New events use `trackEvent` or `event-registry.ts` (not Storybook edits).
- Unit tests cover sanitization/registry where logic changed.
- No `posthog-js` import outside `apps/frontend/lib/analytics/`.
