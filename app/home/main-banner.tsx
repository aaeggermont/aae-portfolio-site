"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from 'aos';
import "aos/dist/aos.css";
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from "./main-banner.module.scss";
import AntonioBannerPhoto from "./images/AntonioBannerPhoto.png";




function MainBanner() {

  useEffect(() => {
    AOS.init({
      duration: 900,          // animation duration (ms)
      easing: "ease-out-cubic",
      once: true,             // animate only once
      offset: 80,             // trigger offset from bottom
    });
  }, []);

  const handleLinkedIn = () => {
      window.location.href = 'https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/';
  };

  return (
    <section className={styles.mainBanner}>
      
      {/* Text side */}
      <div 
        className={styles.bannerTexContent}
        data-aos="fade-right"
        data-aos-delay="100">
        <h1 className={styles.helloText}>Hello, my name is <span>Antonio</span></h1>
        <h2 className={styles.backgroundText}>
            UX Engineer, Applications Developer & Technologist
        </h2>
        <p className={styles.description}>
            I build modern, performant web applications and AI-powered interfaces
            and adopt emerging technologies through Human-Centered Design and Design
            Thinking.
        </p>

        <IconButton
            data-aos="fade-up"
            data-aos-delay="300"
            aria-label="Visit my LinkedIn profile"
            onClick={handleLinkedIn}
            className={styles.linkedinButton}
        >
        <LinkedInIcon /> </IconButton>
      </div>

      {/* Photo side */}
      <div 
        className={styles.bannerPhoto}
        data-aos="fade-left"
        data-aos-delay="200">
        <div className={styles.blobMask}>
          <Image
            src={AntonioBannerPhoto}
            alt="AAE Photo"
            fill
            priority
            className={styles.bannerPhotoImage}
          />
        </div> 
      </div>
    </section>  
  );
}
export default MainBanner;
