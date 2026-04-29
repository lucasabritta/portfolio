const LOCAL_SITE_ORIGIN = "http://localhost:3000";

function candidateOrigins(): Array<string | undefined> {
  return [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
}

function withProtocol(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("localhost") || value.startsWith("127.0.0.1")) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

export function getSiteOrigin(): string {
  for (const candidate of candidateOrigins()) {
    const trimmed = candidate?.trim().replace(/\/+$/, "");
    if (!trimmed) {
      continue;
    }

    try {
      return new URL(withProtocol(trimmed)).origin;
    } catch {
      continue;
    }
  }

  return LOCAL_SITE_ORIGIN;
}

export function buildAbsoluteSiteUrl(pathname = "/"): string {
  return new URL(pathname, getSiteOrigin()).toString();
}
