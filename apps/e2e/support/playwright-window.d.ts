export {};

declare global {
  interface Window {
    /** Injected by Playwright addInitScript in posthog-ingest helper. */
    __PF_POSTHOG_KEY__?: string;
  }
}
