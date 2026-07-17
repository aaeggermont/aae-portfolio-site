'use client';

import { useEffect, useState, type ReactNode } from 'react';
import styles from './aboutmeMore.module.scss';
import { AboutMeMoreProfesionalExperience } from './AboutMeMoreProfesionalExperience';
import { AboutMeMoreCard, AboutMeMoreCardType } from './AboutMeMoreCard';
import { AboutMeMoreEducation } from './AboutMeMoreEducation';
import { AboutMeMoreCertifications } from './AboutMeMoreCertifications';
import { AboutMeMorePersonalTime } from './AboutMeMorePersonalTime';
import { ExperienceTrainingContext } from './ExperienceTrainingContext';
import {
  experienceTrainingFallback,
  type ExperienceTrainingData,
} from '@/app/aboutme/data/experience-training-data';
import { subscribeExperienceTrainingData } from '@/app/aboutme/lib/experience-training.firestore';

const availableCards = [
  {
    type: AboutMeMoreCardType.professional_experience,
    title: 'Professional Experience'
  },
  {
    type: AboutMeMoreCardType.education,
    title: 'Education'
  },
  {
    type: AboutMeMoreCardType.certifications,
    title: 'Certifications'
  },
  {
    type: AboutMeMoreCardType.personal,
    title: 'When I am not working...'
  },
] as const;

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
        className={styles.aboutmeMore}
        aria-labelledby="about-me-more-title"
      >
        <header className={styles.aboutmeMoreHeader}>
          <h2 id="about-me-more-title" className={styles.aboutmeMoreTitle}>
            {data.sectionTitle}
          </h2>
        </header>
        <div className={styles.aboutmeMoreCards}>
          {availableCards.map((card, index) => (
            <AboutMeMoreCard
              key={`${index}-about-me-card`}
              type={card.type}
              title={card.title}
              selected={card.type === selected}
              onClick={(type) => {
                if (type) setSelected(type);
              }}
            />
          ))}
        </div>
        <div className={styles.aboutmeMoreSection}>{sections[selected]}</div>
      </section>
    </ExperienceTrainingContext.Provider>
  );
}
