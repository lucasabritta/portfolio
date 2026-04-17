import { cvPdfLayoutStyles } from "@cv-pdf/styles/layout";

/** Twips → points (Word: 1 twip = 1/20 pt). */
const tw = (n: number) => n / 20;

/** DOCX left table column width (3285 twips) — layout uses 164pt for Yoga rounding. */
export const CV_PDF_LEFT_COL_WIDTH_PT = tw(3285);

/** Horizontal cell padding (72 twips) on the left column in `layout.ts`. */
export const CV_PDF_LEFT_CELL_PADDING_PT = tw(72);

/** Inner width for sidebar text/URLs: {@link layout.ts} `leftColumn.width` minus 2× padding. */
export const CV_PDF_LEFT_INNER_WIDTH_PT =
  cvPdfLayoutStyles.leftColumn.width - 2 * CV_PDF_LEFT_CELL_PADDING_PT;

/**
 * X position where right-column body text begins. Derived from {@link cvPdfLayoutStyles}:
 * page `paddingHorizontal` + sidebar `width` + sidebar `marginRight` + right column
 * `paddingHorizontal`. Keep this in sync by reading the styles rather than duplicating literals.
 */
export const CV_PDF_RIGHT_COLUMN_INNER_LEFT_PT =
  cvPdfLayoutStyles.page.paddingHorizontal +
  cvPdfLayoutStyles.leftColumn.width +
  cvPdfLayoutStyles.leftColumn.marginRight +
  cvPdfLayoutStyles.rightColumn.paddingHorizontal;
