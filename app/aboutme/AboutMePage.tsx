// app/aboutme/AboutMePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./aboutme.module.scss";
import { useResponsive } from "@/app/lib/responsive/ResponsiveQueryProvider";

export default function AboutMePage() {
  const screen = useResponsive();

  // Avoid hydration mismatch by only rendering
  // responsive-dependent UI after mount
  const [mounted, setMounted] = useState(false);
    useEffect(() => {
    setMounted(true);
  }, []);

  if ( screen.isDesktopOrLaptop ) {
    console.log("Rendering for Desktop or Laptop");
    return (
      <>
        {mounted && (
          <div className={styles.aboutMePage}>
            <section className={styles.content}>
              <p> Desktop Device: {screen.isDesktopOrLaptop.toString()} </p>
            </section>
          </div>
         
           )}
      </>
    );
  } else if ( screen.isTablet ) {
    console.log("Rendering for Tablet");
      return (
        <>
          {mounted && (
            <section className={styles.content}>
              <p> Tablet Device: {screen.isTablet.toString()} </p>
            </section>
           )}
        </>);
  } else if ( screen.isMobile ) {
    console.log("Rendering for Mobile");
    return (
      <>
        {mounted && (
          <section className={styles.content}>
            <p> Mobile Device: {screen.isMobile.toString()} </p>
          </section>
        )}
      </>
    );
  }
}
