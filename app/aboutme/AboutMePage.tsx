// app/aboutme/AboutMePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./aboutme.module.scss";
import { useResponsive } from "@/app/lib/responsive/ResponsiveQueryProvider";

// Views

import { ProfileMdLgDesktopView } from "@/app/aboutme/components/ProfileMdLgDesktopView";
import { ProfileSmSxView } from "@/app/aboutme/components/ProfileSmSxView";


export default function AboutMePage() {
  const screen = useResponsive();

  // Avoid hydration mismatch by only rendering
  // responsive-dependent UI after mount
  const [mounted, setMounted] = useState(false);
    useEffect(() => {
    setMounted(true);
  }, []);

  if ( screen.isMobile ) {
    console.log("Rendering for Mobile");
    return (
      <>
        {mounted && (
          <div className={styles.aboutMePage}>
            <section className={styles.content}>
              <p> Mobile Device: {screen.isMobile.toString()} </p>
              <ProfileSmSxView />
            </section>
          </div>
         
           )}
      </>
    );
  } else if ( screen.isTablet ||  screen.isDesktopOrLaptop) {
    console.log("Rendering for Tablet or laptop");
      return (
        <>
          {mounted && (
            <div className={styles.aboutMePage}>
              <section className={styles.content}>
                <p> Desktop/Tablet Device: {screen.isTablet.toString()} </p>
                <ProfileMdLgDesktopView />
              </section>
             </div>
           )}
        </>);
  }
}
