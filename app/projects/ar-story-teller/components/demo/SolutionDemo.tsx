'use client';
import { useRef, type ReactNode } from 'react';
import './SolutionDemo.scss';
import ProjectImage from '@/lib/media/ProjectImage';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

/** Firestore Storage path for the demo gif (kept here so callers don't need to re-pass it). */
const AR_DEMO_OBJECT_PATH = 'projects/project_1/ARTowerofTerrorDemo.gif';
const AR_DEMO_ALT = 'AR Tower of Terror demo';

/** Intrinsic ratio for the gif — drives `next/image` aspect; final size is capped via SCSS. */
const AR_DEMO_INTRINSIC_WIDTH = 1080;
const AR_DEMO_INTRINSIC_HEIGHT = 1920;

interface SolutionDemoProps {
  title?: string;
  paragraphs?: ReactNode;
  [key: string]: unknown;
}

function SolutionDemoImage() {
  return (
  
      <ProjectImage
        data-aos="fade-in"
        data-aos-duration="12000"
        data-aos-anchor-placement="top-center"
        objectPath={AR_DEMO_OBJECT_PATH}
        alt={AR_DEMO_ALT}
        width={AR_DEMO_INTRINSIC_WIDTH}
        height={AR_DEMO_INTRINSIC_HEIGHT}
        className="solution-demo-image"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />

  );
}

function SolutionDemoTitleDesktop({ title, paragraphs }: SolutionDemoProps) {
  if (!title && !paragraphs) return null;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-anchor-placement="top-center"
      className="project-summary-container">
      <div className="storyteller-laptoplg-content-center">
        <span>{title}</span>
        <p>{paragraphs}</p>
      </div>
    </div>
  );
}

function SolutionDemoTitleTablet({ title, paragraphs }: SolutionDemoProps) {
  if (!title && !paragraphs) return null;
  return (
    <div className="project-summary-container">
      <div className="content">
        <span>{title}</span>
        <p>{paragraphs}</p>
      </div>
    </div>
  );
}

function SolutionDemoTitleMobile({ title, paragraphs }: SolutionDemoProps) {
  if (!title && !paragraphs) return null;
  return (
    <div className="storyteller-mobile-paragraph-container">
      <div className="storyteller-mobile-content">
        <div className="storyteller-mobile-paragraph-title">{title}</div>
        <p className="storyteller-mobile-paragraph-text">{paragraphs}</p>
      </div>
    </div>
  );
}

export function SolutionDemo({ title, paragraphs, ...attrs }: SolutionDemoProps) {
  const screenDevice = useResponsive();
  const ref1 = useRef<HTMLDivElement>(null);

  if (screenDevice.isDesktopOrLaptop) {
    return (
      <div {...attrs} className="solution-demo-container">
        <SolutionDemoTitleDesktop title={title} paragraphs={paragraphs} />
        <div ref={ref1} className="laptop-demo-animation">
          <div className="mobile-ar-image">
            <SolutionDemoImage />
          </div>
        </div>
      </div>
    );
  }

  if (screenDevice.isTablet) {
    return (
      <div {...attrs} className="solution-demo-container">
        <SolutionDemoTitleTablet title={title} paragraphs={paragraphs} />
        <SolutionDemoImage />
      </div>
    );
  }

  if (screenDevice.isMobile) {
    return (
      <div {...attrs} className="solutiondemo-smxs-container">
        <SolutionDemoTitleMobile title={title} paragraphs={paragraphs} />
        <div ref={ref1} className="mobile-demo-animation">
          <div className="mobile-ar-image">
            <SolutionDemoImage />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
