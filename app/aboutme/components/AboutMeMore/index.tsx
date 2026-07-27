'use client';

import { useEffect, useState, type ReactNode } from 'react';
import styles from './aboutmeMore.module.scss';
import { AboutMeMoreProfesionalExperience } from './AboutMeMoreProfesionalExperience';
import { AboutMeMoreCardType } from './AboutMeMoreCard';
import { AboutMeMoreEducation } from './AboutMeMoreEducation';
import { AboutMeMoreCertifications } from './AboutMeMoreCertifications';
import { AboutMeMorePersonalTime } from './AboutMeMorePersonalTime';
import { AboutMeMoreCarousel } from './AboutMeMoreCarousel';
import { ExperienceTrainingContext } from './ExperienceTrainingContext';
import {
  experienceTrainingFallback,
  type ExperienceTrainingData,
} from '@/app/aboutme/data/experience-training-data';
import { subscribeExperienceTrainingData } from '@/app/aboutme/lib/experience-training.firestore';

export function AboutMeMore() {
  const [selected, setSelected] = useState<AboutMeMoreCardType>(
    AboutMeMoreCardType.professional_experience,
  );
  const [data, setData] = useState<ExperienceTrainingData>(
    experienceTrainingFallback,
  );

  useEffect(() => {
    return subscribeExperienceTrainingData(setData);
  }, []);

  const availableCards = data.topicCards.map((card) => ({
    type: card.id as AboutMeMoreCardType,
    title: card.title,
    ...(card.description ? { description: card.description } : {}),
  }));

  const sections: Record<AboutMeMoreCardType, ReactNode> = {
    professional_experience: (
      <AboutMeMoreProfesionalExperience key="professional_experience" />
    ),
    education: <AboutMeMoreEducation key="education" />,
    certifications: <AboutMeMoreCertifications key="certifications" />,
    personal: <AboutMeMorePersonalTime key="personal" />,
  };

  return (
    <ExperienceTrainingContext.Provider value={data}>
      <section
        id="about-me-more"
        className={styles.aboutmeMore}
        aria-labelledby="about-me-more-title"
      >
        <header className={styles.aboutmeMoreHeader}>
          <p className={styles.aboutmeMoreEyebrow}>Background</p>
          <h2 id="about-me-more-title" className={styles.aboutmeMoreTitle}>
            {data.sectionTitle}
          </h2>
        </header>
        <div className={styles.aboutmeMoreCarouselStrip}>
          <AboutMeMoreCarousel
            items={availableCards}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        <div className={styles.aboutmeMoreSection}>
          <div className={styles.aboutmeMoreSectionInner}>
            {sections[selected]}
          </div>
        </div>
      </section>
    </ExperienceTrainingContext.Provider>
  );
}
