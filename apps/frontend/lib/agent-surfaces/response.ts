const TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
} as const;

export function createAgentTextResponse(body: string): Response {
  return new Response(`${body.trimEnd()}\n`, { headers: TEXT_HEADERS });
}
