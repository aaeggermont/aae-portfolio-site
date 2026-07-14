"use client";

import { useEffect, useState } from "react";
import { ParentSize } from "@visx/responsive";

import type { CapabilityMapData } from "@/app/aboutme/data/capability-map-data";
import { capabilityMapFallback } from "@/app/aboutme/data/capability-map-data";
import { subscribeCapabilityMapData } from "@/app/aboutme/lib/capability-map.firestore";
import { CapabilityMapChart } from "./CapabilityMapChart";
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
      className={styles.capabilityMap}
      aria-labelledby="capability-map-title"
      style={{ maxWidth: sizeStyles.maxWidth }}
    >
      <header className={styles.capabilityMapHeader}>
        <h3 id="capability-map-title" className={styles.capabilityMapTitle}>
          {data.header.title}
        </h3>
        <p className={styles.capabilityMapTagline}>{data.header.tagline}</p>
        <p className={styles.capabilityMapDescription}>{data.header.description}</p>
      </header>

      <div
        className={styles.capabilityMapChartWrap}
        style={{
          height: sizeStyles.height,
          minHeight: sizeStyles.minHeight,
        }}
      >
        {hasMounted ? (
          <ParentSize
            debounceTime={10}
            parentSizeStyles={{ width: "100%", height: "100%", overflow: "visible" }}
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

      <footer className={styles.capabilityMapFooter}>
        <h4 className={styles.capabilityMapFooterTitle}>{data.footer.title}</h4>
        <p className={styles.capabilityMapFooterDescription}>
          {data.footer.description}
        </p>
      </footer>
    </section>
  );
}
