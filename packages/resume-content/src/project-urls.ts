/** Canonical outbound URLs for résumé projects. Shared across résumé data,
 * site marketing blocks, and e2e assertions so edits happen in one place. */
export const PROJECT_URLS = {
  echoesMissingCatPlayStore:
    "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
} as const;

export type ProjectUrlKey = keyof typeof PROJECT_URLS;

/** Host that identifies Google Play Store outbound links. */
export const GOOGLE_PLAY_HOST = "play.google.com";
