# ADR 0005 — Cookieless PostHog analytics in `apps/frontend`

- **Status**: Accepted
- **Date**: 2026-06-05

## Context

The portfolio needs product analytics (page views, CTA clicks, contact intent, project interest) without a cookie consent banner for EU visitors. The repo separates presentation (`@portfolio/storybook`) from the Next app (`apps/frontend`) per [ADR 0002](0002-shared-dom-via-storybook-package.md). Vercel Analytics covers platform metrics but not named product events or funnels.

PostHog supports **cookieless mode** (`cookieless_mode: "always"`) with **Cookieless server hash mode** enabled in the project dashboard, avoiding browser cookies/localStorage while still counting anonymous visitors.

## Decision

1. **PostHog Cloud EU** with `cookieless_mode: "always"`, session replay and surveys disabled, and **no `identify()`** calls.
2. **First-party ingest** via Next.js rewrites (`/ingest` → `eu.i.posthog.com`) to reduce ad-blocker loss.
3. **Production only**: `NEXT_PUBLIC_POSTHOG_KEY` scoped to Vercel **Production**; the SDK self-gates when the key is absent.
4. **All analytics code lives in `apps/frontend`** under `lib/analytics/` and `app/_shell/` providers. **`packages/storybook` stays presentation-only** — no PostHog imports, no `track` props, no `data-analytics-*` attributes.
5. **Generic API**: `trackEvent(name, properties)` for imperative events; automatic link/button tracking via a document click listener + `event-registry.ts` that maps DOM context (landmarks, section ids, pathname) to event names.
6. **Minimal Storybook structural anchors only** (`id="home-hero"`, `id="build-ctas"`) where existing section ids were insufficient — presentational landmarks, not analytics metadata.
7. Keep **Vercel Analytics + Speed Insights** unchanged alongside PostHog.

## Alternatives considered

- **Cookie-based PostHog + consent banner**: rejected — unnecessary friction for a personal portfolio when cookieless mode meets the analytics need.
- **`track` props / data attributes in Storybook**: rejected — couples presentation to analytics; violates the Storybook boundary in ADR 0002.
- **Vercel Analytics only**: rejected — no custom named events or CTA/contact funnel insight.
- **Autocapture-only PostHog**: rejected — noisy event names; explicit registry + `trackEvent` keeps dashboards readable.

## Consequences

- **Pros**: No cookie banner for PostHog; analytics stays in the app layer; adding events is a registry row or `trackEvent` call; Storybook remains PostHog-free.
- **Cons**: DOM-delegation location inference depends on stable section ids/landmarks; no cross-session user identity, session replay, or GeoIP (PostHog cookieless limits); production-only means preview deploys are not tracked.
- **Ops**: Enable **Cookieless server hash mode** in PostHog project settings; verify Cloudflare does not cache `/ingest/*` POSTs after deploy.
- **Shell consolidation (2026)**: `AnalyticsShell` owns PostHog init registration, UTM URL sync, and pageview tracking behind Suspense; `AnalyticsClickCapture` mounts eagerly outside Suspense so fast post-landing clicks still preserve UTMs and record analytics.
- **Impression dedupe**: `analytics-shell-lifecycle.ts` helpers (`preparePageViewTracking`, `shouldTrackNotFoundView`, `shouldTrackErrorBoundary`) plus `trackEvent()` dedupe `page_viewed`, `not_found_viewed`, and `error_boundary_shown` within a navigation epoch so React Strict Mode and remounts do not inflate counts; `trackImpression()` remains available for new impression events without lifecycle helpers.
- **Hydration-safe UTMs**: internal href decoration for nav/CTA/status links happens post-mount via `usePreservedHrefDecorator()`; the inline bootstrap script intercepts clicks before hydration (using `location.assign` as a hard-nav fallback) while React navigation uses `router.push` after mount — both paths preserve UTMs without silencing React analytics listeners.
- **Client context (2026)**: per-tab `client_window_id` and per-navigation `client_page_instance_id` super properties disambiguate concurrent tabs in cookieless sessions.
- **New-tab click coverage**: middle-click (`auxclick`, button 1) and modifier clicks tag `open_target: "new_tab"` on existing click event names. Right-click “open in new tab” from the context menu is not capturable on the origin page (no DOM event).

## Related

- [ADR 0002](0002-shared-dom-via-storybook-package.md) — shared DOM UI boundary.
- [ADR 0004](0004-docker-compose-local-dev-parity.md) — Docker for validation.
- [`apps/frontend/lib/analytics/`](../../apps/frontend/lib/analytics/) — implementation.
- [`.cursor/skills/analytics-posthog/SKILL.md`](../../.cursor/skills/analytics-posthog/SKILL.md) — agent workflow.
