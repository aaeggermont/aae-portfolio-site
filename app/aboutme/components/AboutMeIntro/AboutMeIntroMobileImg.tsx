import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import ParticlePortrait from '@/components/ParticlePortrait/ParticlePortrait';
import styles from './aboutme_intro.module.scss';

export function AboutMeMobileImg() {
  const screen = useResponsive();

  return <>
    {
      (screen.isMobile) && (
        <div className={styles.aboutmeIntroImg}>
          <div className={styles.aboutmeIntroBannerPhoto}>
            <ParticlePortrait
              src="/images/HeroProfileBase.png"
              className={styles.aboutmeIntroPortrait}
            />
          </div>
        </div>
      )
    }
  </>
}
