'use client';

import { createContext, useContext } from 'react';
import {
  experienceTrainingFallback,
  type ExperienceTrainingData,
} from '@/app/aboutme/data/experience-training-data';

export const ExperienceTrainingContext = createContext<ExperienceTrainingData>(
  experienceTrainingFallback,
);

export function useExperienceTrainingData(): ExperienceTrainingData {
  return useContext(ExperienceTrainingContext);
}
