"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./my-background.module.scss";
import backgroundItems from "@/app/home/data/background-data";
import BackgroundCard from "@/app/home/BackgroundCard";

function AnimatedCardWrapper({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.cardWrapper} ${inView ? styles.cardInView : ""}`}
      style={{
        // small stagger based on index
        transitionDelay: inView ? `${index * 90}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export default function MyBackground() {
  return (
    <section className={styles.myBackgroundSection} id="my-background">
      <div className={styles.content}>
        <h2 className={styles.heading}>My Background</h2>

        <div className={styles.cardsGrid}>
          {backgroundItems.map((item, index) => (
            <AnimatedCardWrapper key={item.title} index={index}>
              <BackgroundCard
                info={item}
                dimensions={{
                  width: "100%",
                  height: 260,
                }}
              />
            </AnimatedCardWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
