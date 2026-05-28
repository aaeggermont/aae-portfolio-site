import ProjectOverview from "../ProjectOverview";
import type { ProjectOverviewSectionData } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";

interface ProjectOverviewSectionProps {
  data: ProjectOverviewSectionData;
}

export function ProjectOverviewSection({ data }: ProjectOverviewSectionProps) {
  return <ProjectOverview data={data.projectOverview} />;
}
