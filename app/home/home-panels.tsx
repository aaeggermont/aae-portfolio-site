"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./home-panels.module.scss";

import MainBanner from "./main-banner";
import MyBackground from "./my-background";
import LatestProjects from "./latest-projects";
import ContactMe from "./contact-me";

gsap.registerPlugin(ScrollTrigger);

function HomePanels() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);

      if (!panels.length) return;

      const totalPanels = panels.length;
      const segments = totalPanels - 1; // number of transitions

      // Stack panels and set initial positions
      panels.forEach((panel, i) => {
        gsap.set(panel, { zIndex: i + 1 });

        if (i > 0) {
          // all panels except the first start below the viewport
          gsap.set(panel, { yPercent: 100 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + window.innerHeight * segments,
          scrub: 0.7,
          pin: true,
          snap: {
            // 👇 snap to nearest "segment" (0, 1/3, 2/3, 1 for 4 panels)
            snapTo: (value) => {
              const raw = value * segments;
              const snappedIndex = Math.round(raw);
              return snappedIndex / segments;
            },
            duration: 0.25,
            ease: "power1.out",
          },
          // markers: true,
        },
      });

      // Initial label (optional, but nice if we later want label-based logic)
      tl.addLabel("panel-0");

      // For each panel after the first, slide it over the previous one
      panels.forEach((panel, i) => {
        if (i === 0) return;

        tl.to(panel, {
          yPercent: 0,
          ease: "power2.out",
        });

        tl.addLabel(`panel-${i}`); // label after panel is fully in place
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.panelsContainer}>
      <section className={styles.panel}>
        <MainBanner />
      </section>

      <section className={styles.panel}>
        <MyBackground />
      </section>

      <section className={styles.panel}>
        <LatestProjects />
      </section>

      <section className={styles.panel}>
        <ContactMe />
      </section>
    </div>
  );
}

export default HomePanels;
