import { Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@/components/cv-pdf/styles";

type LeftColumnHeaderProps = {
  name: string;
  role: string;
};

export function LeftColumnHeader({ name, role }: LeftColumnHeaderProps) {
  return (
    <View>
      <Text style={cvPdfStyles.headerName}>{name}</Text>
      <Text style={cvPdfStyles.headerRole}>{role}</Text>
    </View>
  );
}
