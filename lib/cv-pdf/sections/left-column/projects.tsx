import { Link, Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@/lib/cv-pdf/styles";
import { formatSidebarUrlForPdf } from "@/lib/cv-pdf/sections/text-format";
import type { PersonalProject } from "@/lib/cv-data";

type LeftColumnProjectsProps = {
  projects: readonly PersonalProject[];
};

export function LeftColumnProjects({ projects }: LeftColumnProjectsProps) {
  return (
    <View style={cvPdfStyles.sidebarTextColumn}>
      <View style={cvPdfStyles.dividerLine} />
      <Text style={cvPdfStyles.sectionTitle}>Personal projects</Text>
      {projects.map((project) => (
        <View key={project.title} style={cvPdfStyles.sidebarUrlClip}>
          <Text style={cvPdfStyles.projectDescription}>{project.description}</Text>
          {/** Outer `Link` + inner wrapping `Text` so line boxes respect sidebar width (see sidebar URL layout test). */}
          <Link
            src={project.href}
            wrap
            style={[cvPdfStyles.projectLink, cvPdfStyles.externalLink]}
          >
            <Text wrap>{formatSidebarUrlForPdf(project.href)}</Text>
          </Link>
        </View>
      ))}
    </View>
  );
}
