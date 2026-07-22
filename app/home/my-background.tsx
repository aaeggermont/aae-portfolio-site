"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./my-background.module.scss";
import backgroundItems from "@/app/home/data/background-data";
import { backgroundFloatImages } from "./background-float-images";
import { SectionTypewriterHeading } from "./components/SectionTypewriterHeading";
import { WhatIDoCarousel } from "./components/WhatIDoCarousel";

const FLOAT_COUNT = 14;

type FloaterConfig = {
  img: any;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

export default function MyBackground() {
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);

  useEffect(() => {
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
          size: `${40 + Math.random() * 120}px`,
          delay: `${Math.random() * 5}s`,
          duration: `${10 + Math.random() * 10}s`,
        };
      },
    );

    setFloaters(generated);
  }, []);

  return (
    <section className={styles.myBackgroundSection} id="my-background">
      <div className={styles.floatLayer}>
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

      <div className={styles.content}>
        <SectionTypewriterHeading
          as="div"
          text="What I do"
          className={styles.heading}
        />

        <div className={styles.summarySection}>
          <p className={styles.summarySectionText}>
            A blend of design, engineering, and systems thinking — applied end to
            end.
          </p>
        </div>
      </div>

      <div className={styles.carouselStrip}>
        <WhatIDoCarousel items={backgroundItems} />
      </div>
    </section>
  );
}
