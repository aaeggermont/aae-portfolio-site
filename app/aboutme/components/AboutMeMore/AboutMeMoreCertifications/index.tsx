'use client';

import { Education } from '@/components/Education';
import { toEducationTimeline } from '@/app/aboutme/data/experience-training-logos';
import { useExperienceTrainingData } from '../ExperienceTrainingContext';

export function AboutMeMoreCertifications() {
  const data = useExperienceTrainingData();
  return <Education data={toEducationTimeline(data.certification)} />;
}
