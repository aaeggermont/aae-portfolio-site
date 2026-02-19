'use client';
import { SkillsChart } from '@/components/SkillsChart';
import { AboutMeData } from '../../data/aboutme-data';
import styles from './aboutme_engineering_skills.module.scss';

export function AboutMeEngineeringSkills() {
  return <>
    <div className={styles.aboutMeEngineeringSkills}>
      <h3 className={styles.aboutMeEngineeringSkillsTitle}>Engineering Skills</h3>
      <div className={styles.aboutMeEngineeringSkillsWrapper}>
        {
          AboutMeData.skills.engineering.map(
            (val, i) => (
              <SkillsChart
                key={`engineering-skills-${i}`}
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