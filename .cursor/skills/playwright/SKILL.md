---
name: playwright
description: >-
  Writes, debugs, and reviews Playwright end-to-end tests for web apps. Use when
  adding or fixing Playwright specs, improving locator strategy, debugging flaky
  browser tests, or validating critical user flows.
---

# Playwright Testing

## Default Workflow

1. Inspect existing specs, fixtures, `playwright.config.*`, and package scripts before adding patterns.
2. Model tests around user-visible behavior and critical flows, not implementation details.
3. Prefer small, independent specs that can run in parallel without shared mutable state.
4. Run the narrowest relevant test first, then the package-level Playwright command before reporting completion.

For this repo, e2e specs live under `apps/e2e`. Use Yarn, preferably through Docker Compose when matching CI matters.

## Test Style

- Use descriptive names that state the expected behavior.
- Use Playwright fixtures such as `test`, `page`, and `expect`; add custom fixtures only when they remove real duplication.
- Keep setup in `test.beforeEach` only when every test in the scope needs it. Avoid broad setup that hides test intent.
- Extract helpers for repeated user actions or assertions. Keep helpers typed, local to the spec when possible, and comment only when the flow is not obvious.
- Prefer web-first assertions such as `toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`, and `toBeEnabled`.
- Use `expect` matchers instead of Node `assert`.

## Locator Strategy

Prefer resilient, accessibility-aligned locators in this order:

1. `page.getByRole()` with an accessible name.
2. `page.getByLabel()`, `page.getByPlaceholder()`, `page.getByText()`, or `page.getByTitle()` when they match the user experience.
3. `page.getByTestId()` for stable app-owned hooks, especially where accessible names are dynamic or ambiguous.
4. `page.locator()` only for scoped composition, structural relationships, or cases the built-in locators cannot express cleanly.

Store reused locators in well-named variables inside the test or helper. Avoid brittle CSS/XPath selectors unless there is no better user-facing target.

## Waiting And Flake Control

- Avoid hardcoded sleeps and arbitrary timeouts.
- Let locators and web-first assertions auto-wait whenever possible.
- Use explicit events for navigation, downloads, popups, requests, or responses when those events are the behavior under test.
- Use `locator.waitFor()`, `page.waitForURL()`, `page.waitForLoadState()`, or `expect.poll()` only when an assertion or action does not already express the wait.
- Do not make tests order-dependent. Isolate storage, data, and user state per test or per worker.

## Configuration

- Put browser, base URL, trace, retries, reporter, and project settings in `playwright.config.*`.
- Use Playwright `devices` presets for browser/device projects where appropriate.
- Keep environment-specific values configurable; do not hardcode production domains or secrets in specs.
- Prefer trace/video/screenshot capture through config rather than ad hoc code in each test.

## Verification

Run commands that match the package being changed. In this repo, prefer:

```bash
docker compose run --rm frontend yarn --cwd ../../apps/e2e test:e2e
```

If Docker is unavailable, run the equivalent Yarn script from the relevant package and state that host tooling was used.
