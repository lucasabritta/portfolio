import posthog from "posthog-js";

import { captureEntryParams, getAnalyticsQueryProperties } from "./query-params";

let initialized = false;

export function getPostHogKey(): string | undefined {
  return process.env.NEXT_PUBLIC_POSTHOG_KEY;
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(getPostHogKey());
}

export function initPostHog(): typeof posthog | null {
  const key = getPostHogKey();
  if (!key) {
    return null;
  }

  if (initialized || posthog.__loaded) {
    return posthog;
  }

  posthog.init(key, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    cookieless_mode: "always",
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    respect_dnt: true,
    persistence: "memory",
  });

  captureEntryParams();
  const queryProperties = getAnalyticsQueryProperties();
  if (Object.keys(queryProperties).length > 0) {
    posthog.register(queryProperties);
  }

  initialized = true;
  return posthog;
}

export function registerAnalyticsQueryProperties(): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  const client = getPostHog();
  if (!client) {
    return;
  }

  captureEntryParams();
  const queryProperties = getAnalyticsQueryProperties();
  if (Object.keys(queryProperties).length > 0) {
    client.register(queryProperties);
  }
}

export function getPostHog(): typeof posthog | null {
  if (!isAnalyticsEnabled()) {
    return null;
  }
  if (!initialized && !posthog.__loaded) {
    return initPostHog();
  }
  return posthog;
}
