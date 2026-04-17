import { TimelineData } from '@/app/aboutme/data/aboutme-data';
import { Education } from '@/components/Education';

export function AboutMeMoreCertifications() {
  return <Education data={TimelineData.certification} />
}