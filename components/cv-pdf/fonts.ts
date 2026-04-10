import { Font } from "@react-pdf/renderer";

/**
 * Match reference CV typography (Lato body, Raleway headings).
 * Fonts load from Google Fonts at PDF render time (API route / Node).
 */
Font.register({
  family: "Lato",
  fonts: [
    {
      fontWeight: 400,
      src: "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHvxk.ttf",
    },
    {
      fontWeight: 700,
      src: "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh6UVew8.ttf",
    },
  ],
});

Font.register({
  family: "Raleway",
  fonts: [
    {
      fontWeight: 400,
      src: "https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf",
    },
    {
      fontWeight: 700,
      src: "https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCP.ttf",
    },
  ],
});

Font.register({
  family: "ArialMT",
  src: "C:/Windows/Fonts/arial.ttf",
});
