'use client';

import Typewriter from 'typewriter-effect';
import styles from './biographyIntro.module.scss';
import {
  biographyIntroFallback,
  type BiographyIntroData,
} from '../../data/biography-intro-data';
import { AboutMeDesktopTabletImg } from '../AboutMeIntro/AboutMeIntroDesktopTabletImg';
import { AboutMeMobileImg } from '../AboutMeIntro/AboutMeIntroMobileImg';

type BiographyIntroProps = {
  data?: BiographyIntroData;
};

function TitleTypewriter({ title }: { title: string }) {
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

export function BiographyIntro({
  data = biographyIntroFallback,
}: BiographyIntroProps) {
  return (
    <section className={styles.biographyIntro} aria-labelledby="biography-intro-title">
      <div className={styles.biographyIntroContainer}>
        <div className={styles.biographyIntroInfo}>
          <h1 id="biography-intro-title" className={styles.biographyIntroTitle}>
            <TitleTypewriter title={data.title} />
          </h1>
          <AboutMeMobileImg />
          <p className={styles.biographyIntroSubtitle}>{data.subtitle}</p>
          <div className={styles.biographyIntroBody}>
            {data.paragraphs.map((paragraph, index) => (
              <p key={`biography-intro-p-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
        <AboutMeDesktopTabletImg />
      </div>
    </section>
  );
}
