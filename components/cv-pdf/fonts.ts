import path from "node:path";

import { Font } from "@react-pdf/renderer";

/**
 * Local TTFs under `public/cv-fonts/` (Word CV uses Lato + Raleway).
 * Populate with: `docker compose --profile cv run --rm cv-tools python scripts/download_cv_fonts.py`
 */
const cvFontDir = path.join(process.cwd(), "public", "cv-fonts");

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
