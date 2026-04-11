import { Text, View } from "@react-pdf/renderer";

import { WorkEntry } from "@/lib/cv-pdf/sections/work-entry";
import { cvPdfStyles } from "@/lib/cv-pdf/styles";
import type { ExperienceEntry } from "@portfolio/cv";

type FirstPageEntry = {
  entry: ExperienceEntry;
  showAchievements: boolean;
};

type WorkHistorySectionProps = {
  entries: readonly FirstPageEntry[];
};

export function WorkHistorySection({ entries }: WorkHistorySectionProps) {
  return (
    <View style={cvPdfStyles.workSection}>
      <View style={cvPdfStyles.summaryDivider} />
      <Text style={[cvPdfStyles.sectionTitle, cvPdfStyles.workHistoryTitle]}>Work History</Text>
      {entries.map(({ entry, showAchievements }, index) => (
        <WorkEntry
          key={`${entry.company}-${entry.role}-${entry.period}`}
          entry={entry}
          showAchievements={showAchievements}
          stackPosition={index === 0 ? "first" : "continued"}
        />
      ))}
      {entries.length > 0 && !entries[entries.length - 1].showAchievements ? (
        <Text style={cvPdfStyles.achievementsTitle}>Key achievements:</Text>
      ) : null}
    </View>
  );
}
