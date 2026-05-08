'use client';
import type { CSSProperties } from 'react';
import './ProjectHeader.scss';
import CloudsLayer1 from '../Images/cloud-1.png';
import CloudsLayer2 from '../Images/cloud-2.png';
import CloudsLayer3 from '../Images/cloud-3.png';
import CloudsLayer4 from '../Images/cloud-4.png';
import CloudsLayerMobile1 from '../Images/clouds-layer-1.png';
import CloudsLayerMobile2 from '../Images/clouds-layer-2.png';
import CloudsLayerMobile3 from '../Images/clouds-layer-3.png';
import CloudsLayerMobile4 from '../Images/clouds-layer-4.png';
import CrowdsWaitingDesktop from '../Images/CrowdsWaiting-Desktop.png';
import {
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
} from 'react-scroll-parallax';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import Image, { StaticImageData } from 'next/image';

type ParallaxCloudLayerProps = {
  src: StaticImageData;
  alt: string;
  speed: number;
  aosDelay?: number;
  imgClassName?: string;
  withAos?: boolean;
  /** Extra upward offset for this layer only (px). Does not use `transform`. */
  layerLiftPx?: number;
  /** Visual size multiplier for the image (1 = no change, 0.8 = 80%). */
  scale?: number;
  /** Anchor for the scale; defaults to `center bottom` to match `object-position`. */
  scaleOrigin?: CSSProperties['transformOrigin'];
  /** Override CSS `object-fit`. Default (`cover`) crops the image to fill the container.
      Use `contain` to see the whole image (may letterbox). */
  objectFit?: CSSProperties['objectFit'];
  /** Override CSS `object-position`. Defaults to the value in `.project-header-parallax__img`. */
  objectPosition?: CSSProperties['objectPosition'];
};

function ParallaxCloudLayer({
  src,
  alt,
  speed,
  aosDelay,
  imgClassName = 'project-header-parallax__img',
  withAos = true,
  layerLiftPx = 0,
  scale = 1,
  scaleOrigin = 'center bottom',
  objectFit,
  objectPosition,
}: ParallaxCloudLayerProps) {
  /* Inline top/height so extra lift always wins (CSS var-only overrides were flaky in some cases). */
  const shiftStyle: CSSProperties | undefined =
    layerLiftPx !== 0
      ? {
          top: `calc(-1 * var(--project-header-cloud-lift) - ${layerLiftPx}px)`,
          height: `calc(100% + var(--project-header-cloud-lift) + ${layerLiftPx}px)`,
        }
      : undefined;

  /* Inline image style — sizing/positioning of the image content within the layer.
     Lives on `<Image>` directly so it doesn't fight the library's transforms on
     `ParallaxBannerLayer` or our own `top/height` shift on `__layer-shift`. */
  const imgStyle: CSSProperties | undefined = (() => {
    const style: CSSProperties = {};
    if (scale !== 1) {
      style.transform = `scale(${scale})`;
      style.transformOrigin = scaleOrigin;
    }
    if (objectFit) style.objectFit = objectFit;
    if (objectPosition) style.objectPosition = objectPosition;
    return Object.keys(style).length > 0 ? style : undefined;
  })();

  return (
    <ParallaxBannerLayer expanded speed={speed}>
      <div className="project-header-parallax__layer">
        <div
          className="project-header-parallax__layer-shift"
          style={shiftStyle}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className={imgClassName}
            style={imgStyle}
            {...(withAos
              ? {
                  'data-aos': 'fade-up' as const,
                  ...(aosDelay != null ? { 'data-aos-delay': String(aosDelay) } : {}),
                  'data-aos-anchor': '.banner-titles',
                }
              : {})}
          />
        </div>
      </div>
    </ParallaxBannerLayer>
  );
}

/** Crowd strip below the hero — scroll parallax (Option B), not a `ParallaxBanner` layer. */
function PeopleInLineCrowd({
  speed,
  withAosFade = false,
  /** Vertical offset where the strip sits in the layout (`margin-top`; px, %, rem, etc.). Negative values pull upward. */
  initialTop,
}: {
  speed: number;
  withAosFade?: boolean;
  initialTop?: CSSProperties['marginTop'];
}) {
  const stripStyle: CSSProperties | undefined =
    initialTop != null ? { marginTop: initialTop } : undefined;

  return (
    <div className="people-in-line" style={stripStyle}>
      <Parallax speed={speed} className="people-in-line__parallax">
        <Image
          className="people-in-line__crowd"
          alt="Crowds waiting in line"
          src={CrowdsWaitingDesktop}
          width={1600}
          height={900}
          {...(withAosFade ? { 'data-aos': 'fade' as const } : {})}
        />
      </Parallax>
    </div>
  );
}

function BannerTitles() {
  return (
    <div className="banner-titles">
      <div className="banner-titles__inner">
        <h1 data-aos="fade-up" className="banner-text-title">
          Augmented Reality Magic Tours
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="banner-text-subtitle"
        >
          Exploring storytelling throught computer vision, machine learning and
          Augmented Reality at Walt Disney World.
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="banner-text-subtitle"
        >
          A graduate research project at University of Washington Human
          Centered Design & Engineering.
        </p>
      </div>
    </div>
  );
}

function ProjectHeaderDesktop() {
  return (
    <div className="storyteller-banner">
      <div className="storyteller-banner__hero">
        <BannerTitles />
        <ParallaxBanner className="project-header-parallax">
          <ParallaxCloudLayer
            src={CloudsLayer4}
            alt="Clouds Layer 4"
            speed={12}
            objectFit="contain"
            objectPosition="center 15%"
          />
          <ParallaxCloudLayer
            src={CloudsLayer3}
            alt="Clouds Layer 3"
            speed={8}
            aosDelay={200}
             objectFit="contain"
            objectPosition="center 17%"
          />
          <ParallaxCloudLayer
            src={CloudsLayer2}
            alt="Clouds Layer 2"
            speed={3}
            layerLiftPx={150}
            aosDelay={400}
            objectFit="contain"
            objectPosition="center 28%"
          />
          <ParallaxCloudLayer
            src={CloudsLayer1}
            alt="Clouds Layer 1"
            speed={-3}
            aosDelay={600}
            objectFit="contain"
            objectPosition="center 16%"
          />
        </ParallaxBanner>
      </div>
      <PeopleInLineCrowd initialTop="-45%" speed={38} />
    </div>
  );
}

function ProjectHeaderTablet() {
  return (
    <div className="storyteller-banner">
      <div className="storyteller-banner__hero">
        <BannerTitles />
        <ParallaxBanner className="project-header-parallax">
          <ParallaxCloudLayer src={CloudsLayer4} alt="Clouds Layer 4" speed={4} />
          <ParallaxCloudLayer
            src={CloudsLayer3}
            alt="Clouds Layer 3"
            speed={2}
            aosDelay={200}
            layerLiftPx={50}
          />
          <ParallaxCloudLayer
            src={CloudsLayer2}
            alt="Clouds Layer 2"
            speed={0}
            aosDelay={400}
          />
          <ParallaxCloudLayer
            src={CloudsLayer1}
            alt="Clouds Layer 1"
            speed={-2}
            aosDelay={600}
          />
        </ParallaxBanner>
      </div>
      <PeopleInLineCrowd initialTop="-19%" speed={8} />
    </div>
  );
}

function ProjectHeaderMobile() {
  const mobileTop =
    'project-header-parallax__img project-header-parallax__img--mobile-top';

  return (
    <div className="storyteller-banner">
      <div className="storyteller-banner__hero">
        <BannerTitles />
        <ParallaxBanner className="project-header-parallax">
          <ParallaxCloudLayer
            src={CloudsLayerMobile4}
            alt="Clouds Layer Mobile 4"
            speed={4}
            imgClassName={mobileTop}
          />
          <ParallaxCloudLayer
            src={CloudsLayerMobile3}
            alt="Clouds Layer Mobile 3"
            speed={2}
            aosDelay={200}
            imgClassName={mobileTop}
            layerLiftPx={50}
          />
          <ParallaxCloudLayer
            src={CloudsLayerMobile2}
            alt="Clouds Layer Mobile 2"
            speed={0}
            aosDelay={400}
            imgClassName={mobileTop}
          />
          <ParallaxCloudLayer
            src={CloudsLayerMobile1}
            alt="Clouds Layer Mobile 1"
            speed={-2}
            aosDelay={600}
            withAos={false}
          />
        </ParallaxBanner>
      </div>
      <PeopleInLineCrowd initialTop="-35%" speed={4} withAosFade />
    </div>
  );
}

/** Mobile branch only when viewport is 360–767px; tablet 768–1023px; else desktop. */
export function ProjectHeader() {
  const screenDevice = useResponsive();

  if (screenDevice.isMobile) {
    return <ProjectHeaderMobile />;
  }

  if (screenDevice.isTablet) {
    return <ProjectHeaderTablet />;
  }

  return <ProjectHeaderDesktop />;
}
