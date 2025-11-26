"use client";

import React from 'react';
import Image from "next/image";
import AOS from 'aos';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from "./main-banner.module.scss";
import AntonioBannerPhoto from "./images/AntonioBannerPhoto.png";

function MainBanner() {

    const handleLinkedIn = () => {
        window.location.href = 'https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/';
    };

    return(

      <section className={styles.mainBanner}>

        <div className={styles.bannerTexContent}>
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
              aria-label="Visit my LinkedIn profile"
              onClick={handleLinkedIn}
              className={styles.linkedinButton}
          >
          <LinkedInIcon /> </IconButton>
        </div>

        <div className={styles.bannerPhoto}>
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
