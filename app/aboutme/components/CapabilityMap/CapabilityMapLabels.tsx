import styles from "./capability-map.module.scss";

const expertiseLevels = [
  { label: "Foundational", sizeClass: styles.capabilityMapLabelCircleSm },
  { label: "Proficient", sizeClass: styles.capabilityMapLabelCircleMd },
  { label: "Advanced", sizeClass: styles.capabilityMapLabelCircleLg },
  { label: "Expert", sizeClass: styles.capabilityMapLabelCircleXl },
] as const;

export function CapabilityMapLabels() {
  return (
    <section
      className={styles.capabilityMapLabels}
      aria-labelledby="expertise-level-title"
    >
      <h3 id="expertise-level-title" className={styles.capabilityMapLabelsTitle}>
        Expertise Level
      </h3>
      <ul className={styles.capabilityMapLabelsList} aria-label="Expertise level legend">
        {expertiseLevels.map(({ label, sizeClass }) => (
          <li key={label} className={styles.capabilityMapLabelsRow}>
            <span className={styles.capabilityMapLabelCircleSlot} aria-hidden>
              <span className={`${styles.capabilityMapLabelCircle} ${sizeClass}`} />
            </span>
            <span className={styles.capabilityMapLabelText}>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CapabilityMapLabels;
