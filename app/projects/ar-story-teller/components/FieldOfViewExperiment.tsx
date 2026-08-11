"use client";

import type { FieldOfViewExperiment as FieldOfViewExperimentData } from "../types/designSystemTypes";
import { PANEL_CONTENT_MAX_WIDTH_PX } from "../layoutConfig";
import styles from "./FieldOfViewExperiment.module.scss";

export type FieldOfViewExperimentProps = {
  data: FieldOfViewExperimentData;
};

function PhoneSilhouette({ primary }: { primary?: boolean }) {
  return (
    <div
      className={`${styles.phone} ${primary ? styles.phonePrimary : ""}`}
      aria-hidden
    >
      <div className={styles.phoneScreen} />
    </div>
  );
}

/**
 * Field of View Experiment — three-zone diagram under the AR wireframe panel.
 */
export function FieldOfViewExperiment({ data }: FieldOfViewExperimentProps) {
  const { eyebrow, title, zones } = data;

  return (
    <div
      className={styles.root}
      style={{ maxWidth: `${PANEL_CONTENT_MAX_WIDTH_PX}px` }}
    >
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h4 className={styles.title}>{title}</h4>

      <div className={styles.diagram} role="list">
        {zones.map((zone) => (
          <div
            key={zone.label}
            className={`${styles.zone} ${zone.primary ? styles.zonePrimary : ""}`}
            role="listitem"
          >
            <PhoneSilhouette primary={zone.primary} />
            <p className={styles.zoneLabel}>{zone.label}</p>
            <p className={styles.zoneDesc}>{zone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldOfViewExperiment;
