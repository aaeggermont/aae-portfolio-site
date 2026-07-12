"use client";

import { useEffect, useState } from "react";
import { ParentSize } from "@visx/responsive";

import type { CapabilityMapData } from "@/app/aboutme/data/capability-map-data";
import { capabilityMapFallback } from "@/app/aboutme/data/capability-map-data";
import { subscribeCapabilityMapData } from "@/app/aboutme/lib/capability-map.firestore";
import { CapabilityMapChart } from "./CapabilityMapChart";
import styles from "./capability-map.module.scss";

export function CapabilityMap() {
  const [data, setData] = useState<CapabilityMapData>(capabilityMapFallback);

  useEffect(() => {
    return subscribeCapabilityMapData(setData);
  }, []);

  return (
    <section className={styles.capabilityMap} aria-labelledby="capability-map-title">
      <header className={styles.capabilityMapHeader}>
        <h3 id="capability-map-title" className={styles.capabilityMapTitle}>
          {data.header.title}
        </h3>
        <p className={styles.capabilityMapTagline}>{data.header.tagline}</p>
        <p className={styles.capabilityMapDescription}>{data.header.description}</p>
      </header>

      <div className={styles.capabilityMapChartWrap}>
        <ParentSize debounceTime={10}>
          {({ width, height }) => {
            const chartWidth = width > 0 ? width : 720;
            const chartHeight = height > 0 ? height : Math.min(chartWidth * 0.95, 720);
            const showSkillLabels = chartWidth >= 640;

            return (
              <CapabilityMapChart
                data={data}
                width={chartWidth}
                height={chartHeight}
                showSkillLabels={showSkillLabels}
              />
            );
          }}
        </ParentSize>
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
