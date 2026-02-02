'use client'
import Typewriter from 'typewriter-effect';
import styles from './aboutme_intro.module.scss'
import { AboutMeData } from '../../data/aboutme-data';
import { AboutMeMobileImg } from './AboutMeIntroMobileImg';
import { AboutMeDesktopTabletImg } from './AboutMeIntroDesktopTabletImg';

function TypewriterComponent() {
  return (
    <Typewriter
      options={{
        strings: AboutMeData.pageTitle,
        autoStart: true,
        loop: false,
        deleteSpeed: 50,
      }}
    />
  );
}

export function AboutMeIntro() {
  return <>
    <div className={styles.aboutmeIntro}>
      <div className={styles.aboutmeIntroContainer}>
        <div className={styles.aboutmeIntroInfo}>
          <h1 className={styles.aboutmeIntroTitle}>
            <TypewriterComponent />
          </h1>
          <AboutMeMobileImg />
          <div className={styles.aboutmeIntroDesc}>
            {
              AboutMeData.pageParagraphs.map ((paragraph, index) =>
                <p
                  key={`paragraph-${index}`}
                  className='intro-text'
                  data-aos="fade-up"
                  data-aos-delay="5"
                  data-aos-duration="1000"
                >{ paragraph }</p>
              )
            }
          </div>
        </div>
        <AboutMeDesktopTabletImg />
      </div>
    </div>
  </>
}