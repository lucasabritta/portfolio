import { Document, Page, View } from "@react-pdf/renderer";

import "@cv-pdf/fonts";
import {
  buildPdfWorkEntryKey,
  buildWorkHistoryLayout,
} from "@cv-pdf/work-history";
import { BulletList } from "@cv-pdf/sections/bullet-list";
import {
  LeftColumnLowerBand,
  LeftColumnSummaryBand,
} from "@cv-pdf/sections/left-column";
import { SummarySection } from "@cv-pdf/sections/summary-section";
import { WorkEntry } from "@cv-pdf/sections/work-entry";
import { WorkHistorySection } from "@cv-pdf/sections/work-history-section";
import { cvPdfStyles } from "@cv-pdf/styles";
import { resumeData } from "@portfolio/resume-content";

export function CvPdfDocument() {
  const {
    firstPageEntries,
    firstOverflowAchievements,
    remainingEntries,
    summaryBullets,
  } = buildWorkHistoryLayout(resumeData);

  return (
    <Document
      author={resumeData.name}
      creator="Next.js Portfolio"
      producer="Next.js Portfolio"
      subject={`${resumeData.name} CV`}
      title={`${resumeData.name} CV`}
    >
      <Page size="LETTER" style={cvPdfStyles.page}>
        <View style={[cvPdfStyles.row, cvPdfStyles.summaryBandRow]}>
          <LeftColumnSummaryBand resumeData={resumeData} />
          <View style={cvPdfStyles.rightColumn}>
            <SummarySection summary={resumeData.summary} highlights={summaryBullets} />
          </View>
        </View>
        <View style={[cvPdfStyles.row, cvPdfStyles.lowerBandRow]}>
          <LeftColumnLowerBand resumeData={resumeData} />
          <View style={cvPdfStyles.rightColumn}>
            <WorkHistorySection entries={firstPageEntries} />
          </View>
        </View>
      </Page>

      <Page size="LETTER" style={cvPdfStyles.page}>
        <View style={cvPdfStyles.row}>
          <View style={cvPdfStyles.leftColumn} />
          <View style={cvPdfStyles.rightColumn}>
            <BulletList items={firstOverflowAchievements} />
            {remainingEntries.map((entry, index) => (
              <WorkEntry
                key={buildPdfWorkEntryKey(entry)}
                entry={entry}
                stackPosition={
                  index === 0 && firstOverflowAchievements.length === 0 ? "first" : "continued"
                }
              />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
