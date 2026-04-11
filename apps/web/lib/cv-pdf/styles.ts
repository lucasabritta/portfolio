import { StyleSheet } from "@react-pdf/renderer";
import { cvPdfLayoutStyles } from "@/lib/cv-pdf/styles/layout";
import { cvPdfLeftColumnStyles } from "@/lib/cv-pdf/styles/left-column";
import { cvPdfTypographyStyles } from "@/lib/cv-pdf/styles/typography";
import { cvPdfWorkHistoryStyles } from "@/lib/cv-pdf/styles/work-history";

export const cvPdfStyles = StyleSheet.create({
  ...cvPdfLayoutStyles,
  ...cvPdfTypographyStyles,
  ...cvPdfLeftColumnStyles,
  ...cvPdfWorkHistoryStyles,
});
