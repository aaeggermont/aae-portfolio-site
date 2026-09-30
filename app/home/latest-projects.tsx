// app/home/latest-projects.tsx
"use client";

import React from "react";
import styles from "./latest-projects.module.scss";
import { SectionActionLink } from "@/components/SectionActionLink/SectionActionLink";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import LatestProjectCard from "./LatestProjectCard";
import { latestProjectsItems } from "./data/latestprojects-data";
import { SectionTypewriterHeading } from "./components/SectionTypewriterHeading";
import { selectedWorkLayoutStyle } from "./selectedWorkCardLayout";
import { useBandParallax } from "@/app/projects/automatic-seater-assignments/components/useBandParallax";

function LatestProjects() {
  const workParallaxRef = useBandParallax<HTMLDivElement>({
    factor: 0.045,
    maxPx: 32,
  });

  return (
    <section
      className={styles.latestProjectsSection}
      id="latest-projects"
      style={selectedWorkLayoutStyle}
    >
      <div className={styles.content}>
        <SectionTypewriterHeading
          text="Selected Work"
          className={styles.heading}
        />

        <div className={styles.summarySection}>
          <span className={styles.summarySectionText}>
            A selection of projects across immersive experiences, revenue
            management, and operational tools, combining UX design, software
            engineering, data, and emerging technologies.
          </span>
        </div>

        <div ref={workParallaxRef}>
        {/* Desktop — equal grid when all 3 cards fit (≥1024px) */}
        <div className={styles.projectsGrid}>
          {latestProjectsItems.map((item) => (
            <div key={item.title} className={styles.projectsGridItem}>
              <LatestProjectCard
                title={item.title}
                role={item.role}
                description={item.description}
                outcome={item.outcome}
                thumbnailImg={item.img}
                href={item.href}
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
              spaceBetween: 16,
              centeredSlides: false,
            },
          }}
        >
          {latestProjectsItems.map((item) => (
            <SwiperSlide key={item.title}>
              <div className={styles.carouselCardShell}>
                <LatestProjectCard
                  title={item.title}
                  role={item.role}
                  description={item.description}
                  outcome={item.outcome}
                  thumbnailImg={item.img}
                  href={item.href}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.viewAllWorkContainer}>
          <SectionActionLink href="/aboutme" label="About me" tone="amber" />
          <SectionActionLink href="/mywork" label="View all work" tone="navy" />
        </div>
        </div>
      </div>
    </section>
  );
}

export default LatestProjects;
