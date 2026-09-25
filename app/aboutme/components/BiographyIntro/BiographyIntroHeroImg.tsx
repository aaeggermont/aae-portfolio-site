'use client';

import Image from 'next/image';

import { buildPublicStorageUrl } from '@/lib/firebase/publicStorageUrl';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import styles from './biographyIntro.module.scss';

const HERO_IMAGE_OBJECT_PATH = 'site/biography/MyJourneyHero.png';

type BiographyIntroHeroImgProps = {
  variant: 'mobile' | 'desktop';
};

export function BiographyIntroHeroImg({ variant }: BiographyIntroHeroImgProps) {
  const screen = useResponsive();
  const visible =
    variant === 'mobile' ? screen.isMobile : screen.isTabletUp;

  if (!visible) return null;

  const src = buildPublicStorageUrl(HERO_IMAGE_OBJECT_PATH);

  return (
    <div className={styles.biographyIntroImg}>
      <div className={styles.biographyIntroHeroMedia}>
        <div className={styles.biographyIntroHeroHalo} aria-hidden />
        <div className={styles.biographyIntroBannerPhoto}>
          <Image
            src={src}
            alt="Illustration for My Journey biography"
            fill
            priority
            sizes={
              variant === 'mobile'
                ? '(max-width: 767px) 80vw, 280px'
                : '(min-width: 768px) 40vw, 524px'
            }
            className={styles.biographyIntroProfilePhoto}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
