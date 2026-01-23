import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import styles from './aboutme_intro.module.scss';
import { AboutMeData } from '../../data/aboutme-data';
import Image from 'next/image';

export function AboutMeDesktopTabletImg() {
  const screen = useResponsive();

  return <>
    {
      (screen.isDesktopOrLaptop || screen.isTablet) && (
        <div className={styles.aboutmeIntroImg}>
          <div className={styles.aboutmeIntroBannerPhoto}>
            <Image
              src={AboutMeData.profilePhoto}
              alt="Portrait of Antonio Aranda Eggermont"
              fill
              priority
              className={styles.aboutmeIntroProfilePhoto}
            />
          </div>
        </div>
      )
    }
  </>
}