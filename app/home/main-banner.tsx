"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import gsap from "gsap";

import styles from "./main-banner.module.scss";
import AntonioBannerPhoto from "./images/AntonioBannerPhoto.png";
import Typewriter from 'typewriter-effect';

function TypewriterComponent() {
  return (
    <Typewriter
      options={{
        strings: "Hello, my name is Antonio",
        autoStart: true,
        loop: false,
        pauseFor: 2500,
        deleteSpeed: 50,
      }}
    />
  );
}



function MainBanner() {
  const textRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
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
      <div className={styles.bgGradientOrb}></div>
      {/* Text side */}
      <div
        ref={textRef}
        className={styles.bannerTexContent}
      >
        <h1 className={styles.helloText}>
          <TypewriterComponent />
        </h1>

        <h2 className={styles.backgroundText}>
          UX Engineer, Applications Developer &amp; Technologist
        </h2>

        <p className={styles.description}>
          I build modern, performant web applications and AI-powered interfaces
          and adopt emerging technologies through Human-Centered Design and
          Design Thinking.
        </p>

        {/* LinkedIn button – last row in the text block */}
        <div className={styles.linkedinWrapper}>
          <IconButton
            aria-label="Visit my LinkedIn profile"
            onClick={handleLinkedIn}
            className={styles.linkedinButton}
          >
            <span className={styles.linkedinIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                role="img"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  rx="4"
                  ry="4"
                  fill="none"
                />
                <path
                  fill="#ffffff"
                  d="M6.5 7.5C5.67 7.5 5 6.83 5 6s.67-1.5 1.5-1.5S8 5.17 8 6s-.67 1.5-1.5 1.5zM6 9h3v9H6zM10.5 9h2.8v1.23h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.96 3.52 4.51V18h-3v-4.04c0-.96-.02-2.19-1.34-2.19-1.34 0-1.55 1.05-1.55 2.12V18h-3z"
                />
              </svg>
            </span>
          </IconButton>

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
          <Image
            src={AntonioBannerPhoto}
            alt="Portrait of Antonio Aranda Eggermont"
            fill
            priority
            className={styles.bannerPhotoImage}
            sizes="(max-width: 767px) 70vw, (max-width: 1023px) 40vw, 26vw"
          />
        </div>
      </div>
    </section>
  );
}

export default MainBanner;
