import styles from './skills-chart.module.scss';

type SkillsChartProps = {
  name: string;
  percent: number;
}

export function SkillsChart({
  name,
  percent,
}: SkillsChartProps) {
  return <>
    <div className={styles.skillsChartProgressInner}>
      <span className={styles.skillsChartLabel}>{name}</span>
      <div className={styles.skillsChartBackground}>
        <div className={styles.skillsChartBar}>
          <div
            className={styles.skillsChartBarIn}
            style={{ width: percent + "%" }}
          ></div>
        </div>
      </div>
    </div>
  </>
}