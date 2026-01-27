import { useState } from 'react';
import styles from './aboutmeMore.module.scss';
import { AboutMeMoreProfesionalExperience } from './AboutMeMoreProfesionalExperience';
import { AboutMeMoreCard, AboutMeMoreCardType, availableCards } from './AboutMeMoreCard';
import { AboutMeMoreEducation } from './AboutMeMoreEducation';
import { AboutMeMoreCertifications } from './AboutMeMoreCertifications';
import { AboutMeMorePersonalTime } from './AboutMeMorePersonalTime';

export function AboutMeMore() {
  const [selected, setSelected] = useState<AboutMeMoreCardType>(AboutMeMoreCardType.professional_experience);

  const sections = {
    professional_experience: <AboutMeMoreProfesionalExperience key='professional_experience'/>,
    education: <AboutMeMoreEducation key='education'/>,
    certifications: <AboutMeMoreCertifications key='certifications'/>,
    personal: <AboutMeMorePersonalTime key='personal'/>
  }

  return <>
    <div className={styles.aboutmeMore}>
      <div className={styles.aboutmeMoreCards}>
        {
          availableCards.map((card, index) =>
            <AboutMeMoreCard
              key={`${index}-about-me-card`}
              type={card.type}
              title={card.title}
              selected={card.type === selected}
              onClick={(type) => {
                if (type) setSelected(type)
              }}
            />
          )
        }
      </div>
      <div className={styles.aboutmeMoreSection}>{ sections[selected] }</div>
    </div>
  </>
}