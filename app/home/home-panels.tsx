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
      const segments = totalPanels - 1;

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
            // snap to nearest section (0, 1/3, 2/3, 1 for 4 panels)
            snapTo: (value) => {
              if (segments <= 0) return 0;
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

      // Panels slide + MyBackground cards anim
      panels.forEach((panel, i) => {
        if (i === 0) {
          // First panel (MainBanner) stays at yPercent 0;
          // its internal animation is handled by MainBanner itself.
          return;
        }

        // Slide this panel up over the previous one
        tl.to(panel, {
          yPercent: 0,
          ease: "power2.out",
          duration: 1, // relative; scrub controls real feel
        });

        // MyBackground (index 1) → animate its cards when the panel comes in
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
              "<0.1" // just after panel slide starts
            );
          }
        }

        // You can add similar blocks later for LatestProjects, ContactMe
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
