// app/home/latest-projects.tsx
"use client";

import React, { useEffect, useState } from "react";
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
import { SectionTypewriterHeading } from "./components/SectionTypewriterHeading";
import { selectedWorkLayoutStyle } from "./selectedWorkCardLayout";

const FLOAT_COUNT = 14;

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
    <section
      className={styles.latestProjectsSection}
      id="latest-projects"
      style={selectedWorkLayoutStyle}
    >
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
        <SectionTypewriterHeading
          text="Selected Work"
          className={styles.heading}
        />

        <div className={styles.summarySection}>
          <span className={styles.summarySectionText}>
            A selection of recent work across AR experiences, revenue
            management modernization, and intelligent operational tools—
            projects that blend UX design, frontend engineering, and
            AI-driven thinking, used by millions of guests and internal
            operators.
          </span>
        </div>

        {/* Desktop — equal grid when all 3 cards fit (≥1024px) */}
        <div className={styles.projectsGrid}>
          {latestProjectsItems.map((item) => (
            <div key={item.title} className={styles.projectsGridItem}>
              <LatestProjectCard
                title={item.title}
                description={item.description}
                thumbnailImg={item.img}
              />
            </div>
          ))}
        </div>

        {/* Carousel when 3 cards cannot fit (<1024px) — active slide scales up */}
        <Swiper
          className={styles.projectsSwiper}
          initialSlide={0}
          centeredSlides={false}
          slidesPerView="auto"
          spaceBetween={16}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 16,
              centeredSlides: true,
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 24,
              centeredSlides: false,
            },
          }}
        >
          {latestProjectsItems.map((item) => (
            <SwiperSlide key={item.title}>
              <div className={styles.carouselCardShell}>
                <LatestProjectCard
                  title={item.title}
                  description={item.description}
                  thumbnailImg={item.img}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default LatestProjects;
