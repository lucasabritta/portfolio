import posthog from "posthog-js";

import { captureEntryParams, getAnalyticsQueryProperties } from "./query-params";

let initialized = false;

declare global {
  interface Window {
    /** Set in Playwright via addInitScript so e2e can enable analytics without a production key. */
    __PF_POSTHOG_KEY__?: string;
  }
}

function isE2ePostHogKey(key: string): boolean {
  return key.startsWith("phc_e2e");
}

export function getPostHogKey(): string | undefined {
  if (typeof window !== "undefined") {
    // Playwright e2e only — production must not set this global.
    const injected = window.__PF_POSTHOG_KEY__;
    if (injected) {
      return injected;
    }
  }
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
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    ...(isE2ePostHogKey(key)
      ? {
          advanced_disable_flags: true,
          cookieless_mode: "always",
          disable_compression: true,
          flush_at: 1,
          flush_interval: 0,
          opt_out_useragent_filter: true,
          persistence: "memory",
          request_batching: false,
          respect_dnt: false,
        }
      : {
          cookieless_mode: "always",
          persistence: "memory",
          respect_dnt: true,
        }),
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

/** @internal Test-only reset of init guard. */
export function resetPostHogClientForTests(): void {
  initialized = false;
}
