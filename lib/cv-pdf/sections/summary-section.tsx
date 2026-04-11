import { Text, View } from "@react-pdf/renderer";

import { BulletList } from "@/lib/cv-pdf/sections/bullet-list";
import { cvPdfStyles } from "@/lib/cv-pdf/styles";

type SummarySectionProps = {
  summary: string;
  highlights: readonly string[];
};

export function SummarySection({ summary, highlights }: SummarySectionProps) {
  return (
    <View>
      <Text style={cvPdfStyles.sectionTitle}>Professional Summary</Text>
      <Text style={cvPdfStyles.paragraph}>{summary}</Text>
      <BulletList items={highlights} />
    </View>
  );
}
