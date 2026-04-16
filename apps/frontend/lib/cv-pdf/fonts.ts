import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Font } from "@react-pdf/renderer";

const FONT_MARKER = "Lato-Regular.ttf";

/**
 * Resolve `apps/frontend/public/cv-fonts` for dev, Docker, and Vercel.
 * Bundled modules often live under `.next/server/**`, so `import.meta.url` + `../..` no longer
 * reaches `public/` — use `process.cwd()` (monorepo root or `apps/frontend`) first.
 *
 * Populate fonts with: `docker compose --profile cv run --rm cv-tools python scripts/download_cv_fonts.py`
 */
function resolveCvFontDir(): string {
  if (process.env.CV_FONT_DIR) {
    return process.env.CV_FONT_DIR;
  }

  const fromSourceFile = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "public",
    "cv-fonts",
  );

  const candidates = [
    path.join(process.cwd(), "public", "cv-fonts"),
    path.join(process.cwd(), "apps", "frontend", "public", "cv-fonts"),
    fromSourceFile,
  ];

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, FONT_MARKER))) {
      return dir;
    }
  }

  throw new Error(
    `CV fonts not found (expected ${FONT_MARKER} in one of): ${candidates.join(", ")}`,
  );
}

const cvFontDir = resolveCvFontDir();

Font.register({
  family: "Lato",
  fonts: [
    {
      fontWeight: 400,
      src: path.join(cvFontDir, "Lato-Regular.ttf"),
    },
    {
      fontWeight: 700,
      src: path.join(cvFontDir, "Lato-Bold.ttf"),
    },
  ],
});

Font.register({
  family: "Raleway",
  fonts: [
    {
      fontWeight: 400,
      src: path.join(cvFontDir, "Raleway-Regular.ttf"),
    },
    {
      fontWeight: 700,
      src: path.join(cvFontDir, "Raleway-Bold.ttf"),
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);
