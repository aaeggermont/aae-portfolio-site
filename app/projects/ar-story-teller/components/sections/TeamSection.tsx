import Team from "../Team";
import type { TeamSectionData } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";

interface TeamSectionProps {
  data: TeamSectionData;
}

export function TeamSection({ data }: TeamSectionProps) {
  return <Team data={data.team} />;
}
