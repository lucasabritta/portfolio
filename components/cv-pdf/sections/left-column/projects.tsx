import { Link, Text, View } from "@react-pdf/renderer";

import { wrapLongUrl } from "@/components/cv-pdf/sections/text-format";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { PersonalProject } from "@/lib/cv-data";

type LeftColumnProjectsProps = {
  projects: readonly PersonalProject[];
};

export function LeftColumnProjects({ projects }: LeftColumnProjectsProps) {
  return (
    <View>
      <View style={cvPdfStyles.dividerLine} />
      <Text style={cvPdfStyles.sectionTitle}>Personal projects</Text>
      {projects.map((project) => (
        <View key={project.title}>
          <Text style={cvPdfStyles.paragraph}>{project.description}</Text>
          <Link src={project.href} style={[cvPdfStyles.externalLink, cvPdfStyles.projectLink]}>
            {wrapLongUrl(project.href)}
          </Link>
        </View>
      ))}
    </View>
  );
}
