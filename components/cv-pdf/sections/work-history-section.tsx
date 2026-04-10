import { Text, View } from "@react-pdf/renderer";

import { WorkEntry } from "@/components/cv-pdf/sections/work-entry";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { ExperienceEntry } from "@/lib/cv-data";

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
      <Text style={[cvPdfStyles.sectionTitle, cvPdfStyles.workHistoryTitle]}>Work Experience</Text>
      {entries.map(({ entry, showAchievements }) => (
        <WorkEntry key={`${entry.company}-${entry.role}-${entry.period}`} entry={entry} showAchievements={showAchievements} />
      ))}
      {entries.length > 0 && !entries[entries.length - 1].showAchievements ? (
        <Text style={cvPdfStyles.achievementsTitle}>Key achievements:</Text>
      ) : null}
    </View>
  );
}
