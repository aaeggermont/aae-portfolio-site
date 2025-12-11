import { AboutMeData } from '../../../data/aboutme-data';
import Image from "next/image";
import styles from '../../../aboutme.module.scss'
import Typewriter from 'typewriter-effect';

function TypewriterComponent() {
  return (
    <Typewriter
      options={{
        strings: AboutMeData.pageTitle,
        autoStart: true,
        loop: false,
        pauseFor: 2500,
        deleteSpeed: 50,
        html: true
      }}
    />
  );
}

export function ProfileIntroSmSx() {
  return <>
    <div className={styles.intro}>
      <h1 className={styles.aboutTitle}>
        <TypewriterComponent />
      </h1>

      <div className={styles.introImg}>
        <div className={styles.bannerPhoto}>
            <Image
              src={AboutMeData.profilePhoto}
              alt="Portrait of Antonio Aranda Eggermont"
              fill
              priority
              className={styles.profilePhoto}
            />
        </div>
      </div>

      <div className="intro-container">
        <div className="intro-desc">
          {
            AboutMeData.pageParagraphs.map ((paragraph, index) => <p className='intro-text'> {paragraph} </p>)
          }
        </div>
      </div>
    </div>
  </>
}