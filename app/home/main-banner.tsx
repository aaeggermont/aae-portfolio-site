"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ParticlePortrait from "@/components/ParticlePortrait/ParticlePortrait";
import { LinkedInProfileButton } from "@/components/LinkedInProfileButton/LinkedInProfileButton";
import styles from "./main-banner.module.scss";
import Typewriter from "typewriter-effect";
import type { MainBannerData } from "./data/main-banner-data";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

function splitBannerTitle(title: string): { lead: string; rest: string } | null {
  const sep = " · ";
  const parts = title.split(sep);
  if (parts.length < 3) return null;
  // Match desired wrap beyond 1258px:
  //   UX Engineer · Full-stack applications ·
  //   AI-powered experiences
  return {
    lead: `${parts[0]}${sep}${parts[1]}${sep}`,
    rest: parts.slice(2).join(sep),
  };
}

function TypewriterComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <>Antonio Aranda Eggermont</>;
  }

  return (
    <Typewriter
      options={{
        autoStart: false,
        loop: false,
        deleteSpeed: 50,
      }}
      onInit={(typewriter) => {
        typewriter.typeString("Antonio Aranda Eggermont").pauseFor(2500).start();
      }}
    />
  );
}

type MainBannerProps = {
  banner: MainBannerData;
};

function MainBanner({ banner }: MainBannerProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [typewriterKey, setTypewriterKey] = useState(() => 0);
  const prevPathRef = useRef<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (pathname === "/" && prevPathRef.current !== null && prevPathRef.current !== "/") {
      setTypewriterKey((k) => k + 1);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      if (textRef.current) textRef.current.style.opacity = "1";
      if (photoRef.current) photoRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (textRef.current) {
        tl.from(
          textRef.current,
          {
            opacity: 0,
            x: -40,
            duration: 0.7,
            ease: "power2.out",
          },
          0
        );
      }

      if (photoRef.current) {
        tl.from(
          photoRef.current,
          {
            opacity: 0,
            x: 40,
            duration: 0.7,
            ease: "power2.out",
          },
          0.05 // small offset so the photo lags slightly behind the text
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const titleSplit = splitBannerTitle(banner.title);

  return (
    <section className={styles.mainBanner}>
      <div className={styles.bgGradientOrb}></div>

      <div className={styles.bannerContentCap}>
      {/* Text side */}
      <div
        ref={textRef}
        className={styles.bannerTexContent}
      >
        <h1 className={styles.helloText}>
          <TypewriterComponent key={`hero-${typewriterKey}`} />
        </h1>

        <h2 className={styles.backgroundText}>
          {titleSplit ? (
            <>
              <span className={styles.titleFirstLine}>{titleSplit.lead}</span>
              <span className={styles.titleBreak} aria-hidden="true" />
              <span className={styles.titleSecondLine}>{titleSplit.rest}</span>
            </>
          ) : (
            banner.title
          )}
        </h2>

        <p className={styles.description}>{banner.description}</p>

        {/* LinkedIn button – last row in the text block */}
        <div className={styles.linkedinWrapper}>
          <LinkedInProfileButton onClick={handleLinkedIn} />

          {/* Label displayed only on tablet + desktop */}
          <span className={styles.linkedinLabel}>LinkedIn</span>
        </div>
      </div>

      {/* Photo side */}
      <div ref={photoRef} className={styles.bannerPhoto}>
        <ParticlePortrait
          src="/images/HeroProfileBase.png"
          className={styles.bannerPortrait}
        />
      </div>
      </div>
    </section>
  );
}

export default MainBanner;
