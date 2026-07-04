"use client";

import React, { useEffect, useState } from "react";

import styles from "./home-page.module.scss";

import MainBanner from "./main-banner";
import MyBackground from "./my-background";
import LatestProjects from "./latest-projects";
import ContactMe from "./contact-me";
import { LandingSplash } from "@/components/LandingSplash/LandingSplash";
import { preloadLandingImages } from "@/lib/home/preloadLandingAssets";
import { useLoadingSplash } from "@/lib/loadingSplash/useLoadingSplash";
import {
  homePageFallback,
  type HomePageData,
} from "@/app/home/lib/home-page-data";
import { subscribeHomePageData } from "@/app/home/lib/main-page.firestore";

export default function HomePage() {
  const [homePageData, setHomePageData] = useState<HomePageData>(homePageFallback);
  const { phase, isLocked, splashPhase, onFadeEnd } = useLoadingSplash({
    waitFor: preloadLandingImages,
  });

  useEffect(() => {
    return subscribeHomePageData((data) => {
      setHomePageData(data);
    });
  }, []);

  return (
    <>
      <main
        className={styles.homePage}
        aria-hidden={isLocked}
        inert={isLocked ? true : undefined}
      >
        <section id="hero" className={styles.section}>
          <MainBanner banner={homePageData.mainBanner} />
        </section>

        <section id="about" className={styles.section}>
          <MyBackground />
        </section>

        <section id="work" className={styles.section}>
          <LatestProjects />
        </section>

        <section id="contact" className={styles.section}>
          <ContactMe />
        </section>
      </main>

      {phase !== "done" && (
        <LandingSplash phase={splashPhase} onFadeEnd={onFadeEnd} />
      )}
    </>
  );
}
