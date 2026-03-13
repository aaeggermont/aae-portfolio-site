// app/home/latest-projects.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import styles from "./latest-projects.module.scss";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { backgroundFloatImages } from "./background-float-images";
import LatestProjectCard from "./LatestProjectCard";
import { latestProjectsItems } from "./data/latestprojects-data";

const FLOAT_COUNT = 14;

function HeadingTypewriter() {
  const wrapperRef = useRef<HTMLHeadingElement | null>(null);
  const typewriterRef = useRef<{ typeString: (s: string) => { pauseFor: (n: number) => { start: () => void } } } | null>(null);
  const hasStarted = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
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
      { root: null, threshold: 0.2, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hasStarted.current || !typewriterRef.current) return;
    hasStarted.current = true;
    typewriterRef.current.typeString("Selected Work").pauseFor(2500).start();
  }, [inView]);

  return (
    <h2 ref={wrapperRef} className={styles.heading}>
      <Typewriter
        options={{
          autoStart: false,
          loop: false,
          deleteSpeed: 50,
        }}
        onInit={(tw) => {
          typewriterRef.current = tw;
        }}
      />
    </h2>
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

function LatestProjects() {
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
      }
    );

    setFloaters(generated);
  }, []);

  return (
    <section className={styles.latestProjectsSection} id="latest-projects">
      {/* Decorative floating images */}
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
        <HeadingTypewriter />

        <div className={styles.summarySection}>
          <span className={styles.summarySectionText}>
            A selection of recent work across AR experiences, revenue
            management modernization, and intelligent operational tools—
            projects that blend UX design, frontend engineering, and
            AI-driven thinking, used by millions of guests and internal
            operators.
          </span>
        </div>

        <Swiper
          className={styles.projectsSwiper}
          centeredSlides={false}
          slidesPerView={"auto"}
          spaceBetween={10}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          // Breakpoints configuration
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
              centeredSlides: true
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
              centeredSlides: true
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
              centeredSlides: false
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 3,
              spaceBetween: 5,
              centeredSlides: false
            },
        }}
        >
          {latestProjectsItems.map((item) => (
            <SwiperSlide key={item.title}>
              <LatestProjectCard
                title={item.title}
                description={item.description}
                thumbnailImg={item.img}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default LatestProjects;
