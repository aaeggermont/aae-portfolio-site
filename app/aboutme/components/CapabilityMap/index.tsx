"use client";

import { useEffect, useState } from "react";
import { ParentSize } from "@visx/responsive";

import type { CapabilityMapData } from "@/app/aboutme/data/capability-map-data";
import { capabilityMapFallback } from "@/app/aboutme/data/capability-map-data";
import { subscribeCapabilityMapData } from "@/app/aboutme/lib/capability-map.firestore";
import { CapabilityMapChart } from "./CapabilityMapChart";
import { CapabilityMapLabels } from "./CapabilityMapLabels";
import { getCapabilityMapSizeStyles } from "./capability-map.size";
import styles from "./capability-map.module.scss";

export function CapabilityMap() {
  const [data, setData] = useState<CapabilityMapData>(capabilityMapFallback);
  // ParentSize only has real measurements in the browser — defer chart to avoid SSR hydration mismatches.
  const [hasMounted, setHasMounted] = useState(false);
  const sizeStyles = getCapabilityMapSizeStyles();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    return subscribeCapabilityMapData(setData);
  }, []);

  return (
    <section
      className={styles.capabilityMapBand}
      aria-labelledby="capability-map-title"
    >
      <div className={styles.capabilityMapBandInner}>
        <div
          className={styles.capabilityMap}
          style={{ maxWidth: sizeStyles.sectionMaxWidth }}
        >
          <header className={styles.capabilityMapHeader}>
            <p className={styles.capabilityMapEyebrow}>Expertise</p>
            <h2 id="capability-map-title" className={styles.capabilityMapTitle}>
              {data.header.title}
            </h2>
            <p className={styles.capabilityMapTagline}>{data.header.tagline}</p>
            {data.header.description ? (
              <p className={styles.capabilityMapDescription}>
                {data.header.description}
              </p>
            ) : null}
          </header>

          <div className={styles.capabilityMapCard}>
            <div
              className={styles.capabilityMapChartWrap}
              style={{ maxWidth: sizeStyles.chartMaxSize }}
            >
              {hasMounted ? (
                <ParentSize
                  debounceTime={10}
                  parentSizeStyles={{
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                  }}
                >
                  {({ width, height }) => {
                    if (width < 120 || height < 120) {
                      return null;
                    }

                    return (
                      <div className={styles.capabilityMapChartInner}>
                        <CapabilityMapChart
                          data={data}
                          width={width}
                          height={height}
                          showSkillLabels={width >= 640}
                        />
                      </div>
                    );
                  }}
                </ParentSize>
              ) : (
                <div className={styles.capabilityMapChartPlaceholder} aria-hidden />
              )}
            </div>

            <div className={styles.capabilityMapLabelsWrap}>
              <CapabilityMapLabels />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
