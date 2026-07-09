const CLIENT_WINDOW_ID_KEY = "pf:client_window_id";

let clientPageInstanceId: string | null = null;

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Stable per browser tab; stored in sessionStorage. */
export function getClientWindowId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    let id = sessionStorage.getItem(CLIENT_WINDOW_ID_KEY);
    if (!id) {
      id = generateId();
      sessionStorage.setItem(CLIENT_WINDOW_ID_KEY, id);
    }
    return id;
  } catch {
    return generateId();
  }
}

/** Unique per page instance within a tab (rotated on client navigations). */
export function getClientPageInstanceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  if (!clientPageInstanceId) {
    clientPageInstanceId = generateId();
  }
  return clientPageInstanceId;
}

/** Rotates the page instance id after a client-side route change. */
export function rotateClientPageInstanceId(): string {
  clientPageInstanceId = generateId();
  return clientPageInstanceId;
}

export function getClientAnalyticsContext(): Record<string, string> {
  const windowId = getClientWindowId();
  const pageInstanceId = getClientPageInstanceId();
  return {
    client_window_id: windowId,
    client_page_instance_id: pageInstanceId,
  };
}

/** @internal Test-only reset of in-memory and session state. */
export function resetClientAnalyticsContextForTests(): void {
  clientPageInstanceId = null;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem(CLIENT_WINDOW_ID_KEY);
  }
}
