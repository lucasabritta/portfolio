import { Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@/components/cv-pdf/styles";

type BulletListProps = {
  items: readonly string[];
};

export function BulletList({ items }: BulletListProps) {
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={cvPdfStyles.bulletRow}>
          <View style={cvPdfStyles.bulletDot} />
          <Text style={cvPdfStyles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}
