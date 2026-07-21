"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ParticlePortrait from "@/components/ParticlePortrait/ParticlePortrait";
import { LinkedInProfileButton } from "@/components/LinkedInProfileButton/LinkedInProfileButton";
import styles from "./main-banner.module.scss";
import AntonioBannerPhoto from "./images/AntonioBannerPhoto.png";
import Typewriter from "typewriter-effect";
import { backgroundFloatImages } from "./background-float-images";
import type { MainBannerData } from "./data/main-banner-data";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

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

type FloaterConfig = {
  img: any;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

const FLOAT_COUNT = 14;

type MainBannerProps = {
  banner: MainBannerData;
};

function MainBanner({ banner }: MainBannerProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [typewriterKey, setTypewriterKey] = useState(() => 0);
  const prevPathRef = useRef<string | null>(null);
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);
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

  useEffect(() => {
    // This runs ONLY in the browser, after hydration ✅
    const generated: FloaterConfig[] = Array.from({ length: FLOAT_COUNT }).map(
      () => {
        const img =
          backgroundFloatImages[
            Math.floor(Math.random() * backgroundFloatImages.length)
          ];

        return {
          img,
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          size: `${40 + Math.random() * 120}px`, // 40–160px
          delay: `${Math.random() * 5}s`,
          duration: `${10 + Math.random() * 10}s`,
        };
      }
    );

    setFloaters(generated);
  }, []);

  const handleLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className={styles.mainBanner}>
      {/* Full-bleed behind orb + copy + portrait (see .floatLayer z-index) */}
      <div className={styles.floatLayer} aria-hidden="true">
        {floaters.map((f, i) => (
          <Image
            key={`float-${i}-${f.top}-${f.left}`}
            src={f.img}
            alt=""
            aria-hidden="true"
            className={styles.floatImg}
            width={150}
            height={150}
            style={{
              top: f.top,
              left: f.left,
              width: f.size,
              height: "auto",
              animationDelay: f.delay,
              animationDuration: f.duration,
            }}
          />
        ))}
      </div>

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

        <h2 className={styles.backgroundText}>{banner.title}</h2>

        <p className={styles.description}>{banner.description}</p>

        {/* LinkedIn button – last row in the text block */}
        <div className={styles.linkedinWrapper}>
          <LinkedInProfileButton onClick={handleLinkedIn} />

          {/* Label displayed only on tablet + desktop */}
          <span className={styles.linkedinLabel}>LinkedIn</span>
        </div>
      </div>

      {/* Photo side */}
      <div
        ref={photoRef}
        className={styles.bannerPhoto}
      >
        <div className={styles.blobMask}>
        <ParticlePortrait
          src="/images/ProfilePhoto.png"
          className={styles.bannerPhotoImage}
    />

          {/* eslint-disable-next-line @next/next/no-img-element
          <Image
            src={AntonioBannerPhoto}
            alt="Portrait of Antonio Aranda Eggermont"
            fill
            priority
            className={styles.bannerPhotoImage}
            sizes="(max-width: 767px) 70vw, (max-width: 1023px) 40vw, 26vw"
          /> */}
        </div>
      </div>
      </div>
    </section>
  );
}

export default MainBanner;
