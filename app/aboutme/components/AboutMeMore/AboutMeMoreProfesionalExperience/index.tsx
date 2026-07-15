'use client';

import { Timeline } from '@/components/Timeline';
import { toExperienceTimeline } from '@/app/aboutme/data/experience-training-logos';
import { useExperienceTrainingData } from '../ExperienceTrainingContext';

export function AboutMeMoreProfesionalExperience() {
  const data = useExperienceTrainingData();
  return <Timeline data={toExperienceTimeline(data.experience)} />;
}
