import { StyleSheet } from "@react-pdf/renderer";
import { cvPdfLayoutStyles } from "@cv-pdf/styles/layout";
import { cvPdfLeftColumnStyles } from "@cv-pdf/styles/left-column";
import { cvPdfTypographyStyles } from "@cv-pdf/styles/typography";
import { cvPdfWorkHistoryStyles } from "@cv-pdf/styles/work-history";

export const cvPdfStyles = StyleSheet.create({
  ...cvPdfLayoutStyles,
  ...cvPdfTypographyStyles,
  ...cvPdfLeftColumnStyles,
  ...cvPdfWorkHistoryStyles,
});
