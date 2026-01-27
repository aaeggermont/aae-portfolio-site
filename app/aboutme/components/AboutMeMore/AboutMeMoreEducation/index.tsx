import { TimelineData } from '@/app/aboutme/data/aboutme-data';
import { Education } from '@/components/Education';

export function AboutMeMoreEducation() {
  return <Education data={TimelineData.education} />
}