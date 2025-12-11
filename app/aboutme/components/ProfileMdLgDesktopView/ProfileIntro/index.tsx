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
      }}
    />
  );
}

export function ProfileIntroMdLg() {
  return <>
    <div className={styles.intro}>
      <div className={styles.introContainer}>
        <div className={styles.introDesc}>
          <h1 className={styles.aboutTitle}>
            <TypewriterComponent />
          </h1>
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
      </div>
    </div>
  </>
}