"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";

import styles from "./home-page.module.scss";

import MainBanner from "./main-banner";
import MyBackground from "./my-background";
import LatestProjects from "./latest-projects";
import ContactMe from "./contact-me";
import { LandingFloatLayer } from "./components/LandingFloatLayer";
import { LandingSplash } from "@/components/LandingSplash/LandingSplash";
import { preloadLandingImages } from "@/lib/home/preloadLandingAssets";
import { useLoadingSplash } from "@/lib/loadingSplash/useLoadingSplash";
import {
  homePageFallback,
  type HomePageData,
} from "@/app/home/lib/home-page-data";
import { subscribeHomePageData } from "@/app/home/lib/main-page.firestore";
import { isHomeSectionId, scrollHomeToTop } from "@/lib/home/homeAnchors";
import { useSetAtom } from "jotai";
import { layoutState } from "@/app/(public)/layout-state";

export default function HomePage() {
  const setLayoutState = useSetAtom(layoutState);
  const [homePageData, setHomePageData] = useState<HomePageData>(homePageFallback);
  const { phase, isLocked, splashPhase, onFadeEnd } = useLoadingSplash({
    waitFor: preloadLandingImages,
  });
  // Refresh should always open on the hero, not the last scroll position.
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash.replace("#", "");
    if (isHomeSectionId(hash)) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    scrollHomeToTop();
  }, [phase]);

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    return () => setLayoutState({ isFullWidth: false });
  }, [setLayoutState]);

  useEffect(() => {
    return subscribeHomePageData((data) => {
      setHomePageData(data);
    });
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    scrollHomeToTop();
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }
  }, [phase]);

  return (
    <>
      <main
        data-home-page
        className={styles.homePage}
        aria-hidden={isLocked}
        inert={isLocked ? true : undefined}
      >
        <LandingFloatLayer />

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
