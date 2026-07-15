'use client'

import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import styles from './aboutme_intro.module.scss'
import { aboutIntroFallback, type AboutIntroData } from '../../data/about-intro-data';
import { subscribeAboutIntroData } from '../../lib/about-intro.firestore';
import { AboutMeMobileImg } from './AboutMeIntroMobileImg';
import { AboutMeDesktopTabletImg } from './AboutMeIntroDesktopTabletImg';

function TypewriterComponent({ title }: { title: string }) {
  return (
    <Typewriter
      options={{
        strings: title,
        autoStart: true,
        loop: false,
        deleteSpeed: 50,
      }}
    />
  );
}

export function AboutMeIntro() {
  const [intro, setIntro] = useState<AboutIntroData>(aboutIntroFallback);

  useEffect(() => {
    return subscribeAboutIntroData(setIntro);
  }, []);

  return (
    <div className={styles.aboutmeIntro}>
      <div className={styles.aboutmeIntroContainer}>
        <div className={styles.aboutmeIntroInfo}>
          <h1 className={styles.aboutmeIntroTitle}>
            <TypewriterComponent title={intro.pageTitle} />
          </h1>
          <AboutMeMobileImg />
          <div className={styles.aboutmeIntroDesc}>
            {intro.pageParagraphs.map((paragraph, index) =>
              <p
                key={`paragraph-${index}`}
                className='intro-text'
                data-aos="fade-up"
                data-aos-delay="5"
                data-aos-duration="1000"
              >{ paragraph }</p>
            )}
          </div>
        </div>
        <AboutMeDesktopTabletImg />
      </div>
    </div>
  );
}
