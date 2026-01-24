'use client';
import { SkillsChart } from '@/components/SkillsChart';
import { AboutMeData } from '../../data/aboutme-data';
import styles from './aboutme_design_skills.module.scss';

export function AboutMeDesignSkills() {
  return <>
    <div className={styles.aboutMeDesignSkills}>
      <h3 className={styles.aboutMeDesignSkillsTitle}>Design Skills</h3>
      <div className={styles.aboutMeDesignSkillsWrapper}>
        {
          AboutMeData.skills.design.map(
            (val, i) => (
              <SkillsChart
                key={`design-skills-${i}`}
                percent={Number(val.skillPercent)}
                name={val.name}
              />
            )
          )
        }
      </div>
    </div>
  </>
}