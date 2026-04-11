/**
 * Match Word degree lines: plain label, then bold from the colon onward
 * (e.g. `Bachelor's degree` + `: Computer Engineering`).
 * Prefer `": "` so a single colon inside a label does not split wrongly.
 */
export function splitDegree(degree: string): { prefix: string; suffix: string } {
  const spaced = degree.indexOf(": ");
  if (spaced >= 0) {
    return { prefix: degree.slice(0, spaced), suffix: degree.slice(spaced) };
  }
  const c = degree.indexOf(":");
  if (c < 0) {
    return { prefix: degree, suffix: "" };
  }
  return { prefix: degree.slice(0, c), suffix: degree.slice(c) };
}

export function wrapLongUrl(url: string): string {
  return url
    .replaceAll("/", "/\u200b")
    .replaceAll("?", "?\u200b")
    .replaceAll("&", "&\u200b")
    .replaceAll("=", "=\u200b");
}

/**
 * Sidebar URLs: keep the hostname intact, then split path/query with `\n` at natural separators
 * (see {@link softBreakUrlLines}) so each PDF text line stays within the sidebar. ZWSP on each
 * segment still allows extra wraps at `/ ? & =` inside a line.
 *
 * Relying on ZWSP alone is not enough: @react-pdf can emit a single text run as wide as the full
 * string (see geometry check in `cv-pdf-integrity.test.ts`).
 */
export function formatSidebarUrlForPdf(url: string, maxLineChars = 26): string {
  const afterProto = url.indexOf("://");
  if (afterProto < 0) {
    return wrapLongUrl(url);
  }
  const pathIdx = url.indexOf("/", afterProto + 3);
  const authority = pathIdx >= 0 ? url.slice(0, pathIdx) : url;
  const pathAndQuery = pathIdx >= 0 ? url.slice(pathIdx) : "";
  const authFormatted = wrapLongUrl(authority);
  if (!pathAndQuery) {
    return authFormatted;
  }
  const restLines = softBreakUrlLines(pathAndQuery, maxLineChars, 0);
  const restFormatted = restLines.map((line) => wrapLongUrl(line)).join("\n");
  return `${authFormatted}\n${restFormatted}`;
}

function softBreakUrlLines(url: string, maxLineChars: number, minSepIndex: number): string[] {
  if (url.length <= maxLineChars) {
    return [url];
  }
  const out: string[] = [];
  let rest = url;
  const seps = ["/", "?", "&", ".", "_", "-", "="];

  while (rest.length > maxLineChars) {
    const window = rest.slice(0, Math.min(rest.length, maxLineChars + 24));
    /** Prefer the **rightmost** separator before `maxLineChars` (e.g. `?` over `/`). */
    let bestIdx = -1;
    for (const sep of seps) {
      const idx = window.lastIndexOf(sep, maxLineChars + 10);
      if (idx >= minSepIndex && idx < maxLineChars && idx > bestIdx) {
        bestIdx = idx;
      }
    }
    const cut = bestIdx >= 0 ? bestIdx + 1 : maxLineChars;
    out.push(rest.slice(0, cut));
    rest = rest.slice(cut);
  }
  if (rest.length > 0) {
    out.push(rest);
  }
  return out;
}
