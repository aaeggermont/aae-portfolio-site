'use client';
import { useCallback, useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import './ProjectHeader.scss';
import { PROJECT_HEADER_LAYER_COUNT } from '../lib/projectHeaderLayersReady';
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

function useReportImageReady(
  containerRef: RefObject<HTMLDivElement | null>,
  onLayerReady: (() => void) | undefined,
  imageKey: string,
) {
  useEffect(() => {
    if (!onLayerReady) return;

    let reported = false;
    let rafId = 0;
    let img: HTMLImageElement | null = null;
    let loadHandler: (() => void) | null = null;

    const report = () => {
      if (reported) return;
      reported = true;
      onLayerReady();
    };

    const finish = (target: HTMLImageElement) => {
      void target.decode?.().then(report).catch(report);
    };

    const attach = () => {
      img = containerRef.current?.querySelector('img') ?? null;
      if (!img) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      if (img.complete && img.naturalWidth > 0) {
        finish(img);
        return;
      }

      loadHandler = () => finish(img!);
      img.addEventListener('load', loadHandler, { once: true });
    };

    attach();

    return () => {
      cancelAnimationFrame(rafId);
      if (img && loadHandler) {
        img.removeEventListener('load', loadHandler);
      }
    };
  }, [containerRef, onLayerReady, imageKey]);
}

type ParallaxCloudLayerProps = {
  src: StaticImageData;
  alt: string;
  speed: number;
  onLayerReady?: () => void;
  imgClassName?: string;
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
  onLayerReady,
  imgClassName = 'project-header-parallax__img',
  layerLiftPx = 0,
  scale = 1,
  scaleOrigin = 'center bottom',
  objectFit,
  objectPosition,
}: ParallaxCloudLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  useReportImageReady(layerRef, onLayerReady, src.src);

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
          ref={layerRef}
          className="project-header-parallax__layer-shift"
          style={shiftStyle}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority
            className={imgClassName}
            style={imgStyle}
          />
        </div>
      </div>
    </ParallaxBannerLayer>
  );
}

/** Crowd strip below the hero — scroll parallax (Option B), not a `ParallaxBanner` layer. */
function PeopleInLineCrowd({
  speed,
  onLayerReady,
  /** Vertical offset where the strip sits in the layout (`margin-top`; px, %, rem, etc.). Negative values pull upward. */
  initialTop,
}: {
  speed: number;
  onLayerReady?: () => void;
  initialTop?: CSSProperties['marginTop'];
}) {
  const crowdRef = useRef<HTMLDivElement>(null);
  useReportImageReady(crowdRef, onLayerReady, CrowdsWaitingDesktop.src);

  const stripStyle: CSSProperties | undefined =
    initialTop != null ? { marginTop: initialTop } : undefined;

  return (
    <div className="people-in-line" style={stripStyle}>
      <Parallax speed={speed} className="people-in-line__parallax">
        <div ref={crowdRef}>
          <Image
            className="people-in-line__crowd"
            alt="Crowds waiting in line"
            src={CrowdsWaitingDesktop}
            width={1600}
            height={900}
            priority
          />
        </div>
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

function useHeaderLayerLoadTracker(
  onAllLayersReady: (() => void) | undefined,
  viewportKey: string,
) {
  const loadedRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    loadedRef.current = 0;
    doneRef.current = false;
  }, [viewportKey]);

  return useCallback(() => {
    if (doneRef.current) return;
    loadedRef.current += 1;
    if (loadedRef.current >= PROJECT_HEADER_LAYER_COUNT) {
      doneRef.current = true;
      onAllLayersReady?.();
    }
  }, [onAllLayersReady]);
}

type HeaderVariantProps = {
  onLayerReady: () => void;
};

function ProjectHeaderDesktop({ onLayerReady }: HeaderVariantProps) {
  return (
    <div className="storyteller-banner">
      <div className="storyteller-banner__hero">
        <BannerTitles />
        <ParallaxBanner className="project-header-parallax">
          <ParallaxCloudLayer
            src={CloudsLayer4}
            alt="Clouds Layer 4"
            speed={12}
            onLayerReady={onLayerReady}
            objectFit="contain"
            objectPosition="center 15%"
          />
          <ParallaxCloudLayer
            src={CloudsLayer3}
            alt="Clouds Layer 3"
            speed={8}
            onLayerReady={onLayerReady}
             objectFit="contain"
            objectPosition="center 17%"
          />
          <ParallaxCloudLayer
            src={CloudsLayer2}
            alt="Clouds Layer 2"
            speed={3}
            onLayerReady={onLayerReady}
            layerLiftPx={150}
            objectFit="contain"
            objectPosition="center 28%"
          />
          <ParallaxCloudLayer
            src={CloudsLayer1}
            alt="Clouds Layer 1"
            speed={-3}
            onLayerReady={onLayerReady}
            objectFit="contain"
            objectPosition="center 16%"
          />
        </ParallaxBanner>
      </div>
      <PeopleInLineCrowd initialTop="-45%" speed={38} onLayerReady={onLayerReady} />
    </div>
  );
}

function ProjectHeaderTablet({ onLayerReady }: HeaderVariantProps) {
  return (
    <div className="storyteller-banner">
      <div className="storyteller-banner__hero">
        <BannerTitles />
        <ParallaxBanner className="project-header-parallax">
          <ParallaxCloudLayer
            src={CloudsLayer4}
            alt="Clouds Layer 4"
            speed={4}
            onLayerReady={onLayerReady}
          />
          <ParallaxCloudLayer
            src={CloudsLayer3}
            alt="Clouds Layer 3"
            speed={2}
            onLayerReady={onLayerReady}
            layerLiftPx={50}
          />
          <ParallaxCloudLayer
            src={CloudsLayer2}
            alt="Clouds Layer 2"
            speed={0}
            onLayerReady={onLayerReady}
          />
          <ParallaxCloudLayer
            src={CloudsLayer1}
            alt="Clouds Layer 1"
            speed={-2}
            onLayerReady={onLayerReady}
          />
        </ParallaxBanner>
      </div>
      <PeopleInLineCrowd initialTop="-19%" speed={8} onLayerReady={onLayerReady} />
    </div>
  );
}

function ProjectHeaderMobile({ onLayerReady }: HeaderVariantProps) {
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
            onLayerReady={onLayerReady}
            imgClassName={mobileTop}
          />
          <ParallaxCloudLayer
            src={CloudsLayerMobile3}
            alt="Clouds Layer Mobile 3"
            speed={2}
            onLayerReady={onLayerReady}
            imgClassName={mobileTop}
            layerLiftPx={50}
          />
          <ParallaxCloudLayer
            src={CloudsLayerMobile2}
            alt="Clouds Layer Mobile 2"
            speed={0}
            onLayerReady={onLayerReady}
            imgClassName={mobileTop}
          />
          <ParallaxCloudLayer
            src={CloudsLayerMobile1}
            alt="Clouds Layer Mobile 1"
            speed={-2}
            onLayerReady={onLayerReady}
            imgClassName={mobileTop}
          />
        </ParallaxBanner>
      </div>
      <PeopleInLineCrowd
        initialTop="-35%"
        speed={4}
        onLayerReady={onLayerReady}
      />
    </div>
  );
}

type ProjectHeaderProps = {
  onAllLayersReady?: () => void;
};

/** Mobile branch only when viewport is 360–767px; tablet 768–1023px; else desktop. */
export function ProjectHeader({ onAllLayersReady }: ProjectHeaderProps) {
  const screenDevice = useResponsive();
  const viewportKey = screenDevice.isMobile
    ? 'mobile'
    : screenDevice.isTablet
      ? 'tablet'
      : 'desktop';

  const onLayerReady = useHeaderLayerLoadTracker(onAllLayersReady, viewportKey);

  if (screenDevice.isMobile) {
    return <ProjectHeaderMobile onLayerReady={onLayerReady} />;
  }

  if (screenDevice.isTablet) {
    return <ProjectHeaderTablet onLayerReady={onLayerReady} />;
  }

  return <ProjectHeaderDesktop onLayerReady={onLayerReady} />;
}
