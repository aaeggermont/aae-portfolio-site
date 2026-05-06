"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./home-panels.module.scss";

import MainBanner from "./main-banner";
import MyBackground from "./my-background";
import LatestProjects from "./latest-projects";
import ContactMe from "./contact-me";
import { PAGE_CANVAS } from "@/lib/theme/pageCanvas";
import { Footer } from "@/components/Footer";
import { LandingSplash } from "./LandingSplash";
import { preloadLandingImages } from "@/lib/home/preloadLandingAssets";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_SEGMENTS_MULTIPLIER = 1; // one viewport height per panel transition

/** Minimum time splash stays visible (avoids a subliminal flash) */
const MIN_SPLASH_MS = 880;

type SplashPhase = "loading" | "fading" | "done";

function HomePanels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [splashPhase, setSplashPhase] = useState<SplashPhase>("loading");

  useLayoutEffect(() => {
    if (splashPhase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [splashPhase]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let resizeCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);

      if (!panels.length) return;

      const totalPanels = panels.length;
      const segments = totalPanels - 1;

      const getScrollEnd = () =>
        (typeof window !== "undefined" ? window.innerHeight : 800) *
        segments *
        SCROLL_SEGMENTS_MULTIPLIER;

      const panelBgs = panels.map(
        (panel) => panel.getAttribute("data-bg") || "#ffffff"
      );

      gsap.set("body", { backgroundColor: panelBgs[0] });

      panels.forEach((panel, i) => {
        gsap.set(panel, { zIndex: i + 1 });

        if (i > 0) {
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

    ScrollTrigger.refresh();

    void (async () => {
      try {
        await Promise.all([
          preloadLandingImages(),
          document.fonts.ready,
          new Promise<void>((resolve) => setTimeout(resolve, MIN_SPLASH_MS)),
        ]);
      } finally {
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (!cancelled) {
            setSplashPhase("fading");
          }
        });
      }
    })();

    return () => {
      cancelled = true;
      resizeCleanup?.();
      ctx.revert();
    };
  }, []);

  const shellLocked = splashPhase !== "done";

  return (
    <>
      <div
        ref={containerRef}
        className={styles.panelsContainer}
        aria-hidden={shellLocked}
        inert={shellLocked ? true : undefined}
      >
        <section className={styles.panel} data-bg={PAGE_CANVAS}>
          <MainBanner />
        </section>

        <section className={styles.panel} data-bg={PAGE_CANVAS}>
          <MyBackground />
        </section>

        <section className={styles.panel} data-bg={PAGE_CANVAS}>
          <LatestProjects />
        </section>

        <section
          className={`${styles.panel} ${styles.panelWithFooter}`}
          data-bg={PAGE_CANVAS}
        >
          <div className={styles.panelContactStack}>
            <div className={styles.panelContactScroll}>
              <ContactMe embedInPanel />
            </div>
            <div className={styles.panelFooterWrap}>
              <Footer dockedInPanel />
            </div>
          </div>
        </section>
      </div>

      {splashPhase !== "done" && (
        <LandingSplash
          phase={splashPhase === "fading" ? "fading" : "loading"}
          onFadeEnd={() => setSplashPhase("done")}
        />
      )}
    </>
  );
}

export default HomePanels;
