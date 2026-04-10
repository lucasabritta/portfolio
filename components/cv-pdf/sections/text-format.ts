export function splitDegree(degree: string): { prefix: string; suffix: string } {
  const separatorIndex = degree.indexOf(":");
  if (separatorIndex < 0) {
    return { prefix: degree, suffix: "" };
  }

  return {
    prefix: degree.slice(0, separatorIndex),
    suffix: degree.slice(separatorIndex),
  };
}

export function wrapLongUrl(url: string): string {
  return url
    .replaceAll("/", "/\u200b")
    .replaceAll("?", "?\u200b")
    .replaceAll("&", "&\u200b")
    .replaceAll("=", "=\u200b");
}
