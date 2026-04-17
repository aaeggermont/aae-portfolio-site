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

const SCROLL_SEGMENTS_MULTIPLIER = 1; // one viewport height per panel transition

function HomePanels() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let resizeCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);

      if (!panels.length) return;

      const totalPanels = panels.length;
      const segments = totalPanels - 1;

      const getScrollEnd = () =>
        (typeof window !== "undefined" ? window.innerHeight : 800) * segments * SCROLL_SEGMENTS_MULTIPLIER;

      // Collect panel background colors from data-bg
      const panelBgs = panels.map(
        (panel) => panel.getAttribute("data-bg") || "#ffffff"
      );

      // Set initial body background to first panel color
      gsap.set("body", { backgroundColor: panelBgs[0] });

      // Stack panels and set initial positions
      panels.forEach((panel, i) => {
        gsap.set(panel, { zIndex: i + 1 });

        if (i > 0) {
          // all panels except the first start below the viewport
          gsap.set(panel, { yPercent: 100 });
        }
      });

      let currentIndex = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollEnd()}`,
          scrub: 0.7,
          pin: true,
          snap: {
            snapTo: (value) => {
              if (segments <= 0) return 0;
              const raw = value * segments;
              const snappedIndex = Math.round(raw);
              return snappedIndex / segments;
            },
            duration: 0.25,
            ease: "power1.out",
          },
          onUpdate: (self) => {
            if (segments <= 0) return;

            const progress = self.progress;
            const idx = Math.round(progress * segments);

            if (idx !== currentIndex && panelBgs[idx]) {
              currentIndex = idx;
              gsap.to("body", {
                backgroundColor: panelBgs[idx],
                duration: 0.5,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          },
        },
      });

      // Panels slide + MyBackground cards anim
      panels.forEach((panel, i) => {
        if (i === 0) {
          return;
        }

        tl.to(panel, {
          yPercent: 0,
          ease: "power2.out",
          duration: 1,
        });

        if (i === 1) {
          const cards = panel.querySelectorAll(".js-bg-card");

          if (cards.length) {
            tl.from(
              cards,
              {
                opacity: 0,
                y: 24,
                stagger: 0.12,
                duration: 0.6,
                ease: "power2.out",
              },
              "<0.1"
            );
          }
        }
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      resizeCleanup = () => window.removeEventListener("resize", onResize);
    }, containerRef);

    return () => {
      resizeCleanup?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.panelsContainer}>
      {/* Make sure these data-bg values match the section backgrounds */}
      <section
        className={styles.panel}
        data-bg="#f4f8fb"   // MainBanner bg
      >
        <MainBanner />
      </section>

      <section
        className={styles.panel}
        data-bg="#f4f8fb"   // MyBackground bg
      >
        <MyBackground />
      </section>

      <section
        className={styles.panel}
        data-bg="#f4f8fb"   // LatestProjects bg
      >
        <LatestProjects />
      </section>

      <section
        className={styles.panel}
        data-bg="#f4f8fb"   // ContactMe bg
      >
        <ContactMe />
      </section>
    </div>
  );
}

export default HomePanels;
