"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./my-background.module.scss";
import backgroundItems from "@/app/home/data/background-data";
import BackgroundCard from "@/app/home/BackgroundCard";
import Image from "next/image";
import { backgroundFloatImages } from "./background-float-images";
import Typewriter from 'typewriter-effect';

const FLOAT_COUNT = 14;

type FloaterConfig = {
  img: any;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

function ViewTypewriterComponent() {
  return (
    <Typewriter
      options={{
        strings: [`<span class="${styles.heading}">What I do</span>`],
        autoStart: true,
        loop: false,
        deleteSpeed: 50,
        html: true,
        cursor: "|", 
      }}
    />
  );
}

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
        transitionDelay: inView ? `${index * 90}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export default function MyBackground() {
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);

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

  return (
    <section className={styles.myBackgroundSection} id="my-background">
      {/* Decorative floating images – render only after we have client-side config */}
      <div className={styles.floatLayer}>
        {floaters.map((f, i) => (
          <Image
            key={i}
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

        <ViewTypewriterComponent />
        <span className={styles.heading}>What I do</span>
        
        <div className={styles.summarySection}>
          <p className={styles.summarySectionText}>
            I transform user insights into meaningful, well-crafted digital experiences that balance
            clarity, creativity, and usability. By combining UX design, frontend engineering,
            AI-driven application development, and system integration, I build seamless, intelligent
            products that feel intuitive and human from end to end.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {backgroundItems.map((item, index) => (
            <AnimatedCardWrapper key={item.title} index={index}>
              <BackgroundCard
                info={item}
                dimensions={{
                  width: "100%",
                  height: "260px",
                }}
              />
            </AnimatedCardWrapper>
          ))}
        </div>
       
      </div>
    </section>
  );
}
