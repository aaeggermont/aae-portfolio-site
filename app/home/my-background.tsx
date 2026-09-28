"use client";

import React from "react";

import styles from "./my-background.module.scss";
import backgroundItems from "@/app/home/data/background-data";
import { SectionTypewriterHeading } from "./components/SectionTypewriterHeading";
import { WhatIDoCarousel } from "./components/WhatIDoCarousel";

export default function MyBackground() {
  return (
    <section className={styles.myBackgroundSection} id="my-background">
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
