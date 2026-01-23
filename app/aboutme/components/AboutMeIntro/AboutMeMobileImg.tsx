import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import styles from './aboutme_profile.module.scss';
import { AboutMeData } from '../../data/aboutme-data';
import Image from 'next/image';

export function AboutMeMobileImg() {
  const screen = useResponsive();

  return <>
    {
      (screen.isMobile) && (
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
