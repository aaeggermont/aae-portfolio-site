import Image from 'next/image';
import MapDesktopImg from './mapDesktop.png';
import MapMobileImg from './mapMobile.png';
import styles from './aboutme_location.module.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import { useMemo } from 'react';

export function AboutMeLocation() {
  const screen = useResponsive();

  const MapImg = useMemo(() => {
    return screen.isDesktopOrLaptop || screen.isTablet
      ? MapDesktopImg
      : MapMobileImg;
  }, [screen]);

  return <>
    <div className={styles.aboutmeLocation}>
      <h3 className={styles.aboutmeLocationTitle}>I´m from 2 different worlds ...</h3>
      <div className={styles.aboutmeLocationImg}>
        <Image src={MapImg} alt="map" />
      </div>
      <div className={styles.aboutmeLocationInfo}>
        <div className={styles.aboutmeLocationInfo_Cell}>
          Countries of Citizenship:
        </div>
        <div className={styles.aboutmeLocationInfo_Cell}>
          Mexico, USA
        </div>

        <div className={styles.aboutmeLocationInfo_Cell}>
          Cities of Residency:
        </div>
        <div className={styles.aboutmeLocationInfo_Cell}>
          Seattle, Washington Mexico City
        </div>

        <div className={styles.aboutmeLocationInfo_Cell}>
          Languages:
        </div>
        <div className={styles.aboutmeLocationInfo_Cell}>
          English, Spanish
        </div>
      </div>
    </div>
  </>
}