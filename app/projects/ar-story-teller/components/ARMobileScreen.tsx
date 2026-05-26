import React from 'react';
import './ARMobileScreen.scss';
import ProjectImage from '@/lib/media/ProjectImage';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ARMobileScreenProps {
    alt: string;
    /** Three-up array: `[desktop, tablet, mobile]` Firestore Storage object paths. */
    imagesSrc: string[];
    title?: string;
    width?: string;
    description?: string;
    [key: string]: unknown;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/* Intrinsic ratio passed to `next/image` so the rendered <img> reserves a portrait box
   that matches the source artwork (`434 × 884`). Without this, `width: 50%; height: auto`
   resolves against a square ratio and the artwork gets stretched / mis-aligned, which
   amplifies tiny per-PNG inconsistencies (e.g. one frame appearing lower than the others
   in the same row). */
const AR_MOBILE_SCREEN_INTRINSIC_WIDTH = 434;
const AR_MOBILE_SCREEN_INTRINSIC_HEIGHT = 884;

// ─── Component ────────────────────────────────────────────────────────────────

export function ARMobileScreen({
    alt,
    imagesSrc,
    title,
    description,
    ...props
}: ARMobileScreenProps) {
    const screenDevice = useResponsive();
    const desktopImg = imagesSrc?.[0];
    const tabletImg = imagesSrc?.[1];
    const mobileImg = imagesSrc?.[2];

    /* No `padding-top` here on purpose: padding on an <img> renders as transparent space
       *inside* the element's box, which (a) creates a visible gap above the artwork and
       (b) shifts the box-shadow up off the visible content. Vertical spacing is owned by
       the parent container / title instead. */
    const imgStyle: React.CSSProperties = {
        alignSelf: 'center',
        width: '50%',
        height: 'auto',
    };

    if (screenDevice.isDesktopOrLaptop) {
        if (!desktopImg) return null;
        return (
            <div {...props} className="ar-mobile-screen-container">
               
                <ProjectImage
                    objectPath={desktopImg}
                    alt={alt}
                    width={AR_MOBILE_SCREEN_INTRINSIC_WIDTH}
                    height={AR_MOBILE_SCREEN_INTRINSIC_HEIGHT}
                    className="ar-mobile-screen-container__image"
                    style={imgStyle}
                />
                 <span className="title">{title}</span>
                <p className="description">{description}</p>
            </div>
        );
    }

    if (screenDevice.isTablet) {
        if (!tabletImg) return null;
        return (
            <div {...props} className="ar-mobile-screen-container">
                
                <ProjectImage
                    objectPath={tabletImg}
                    alt={alt}
                    width={AR_MOBILE_SCREEN_INTRINSIC_WIDTH}
                    height={AR_MOBILE_SCREEN_INTRINSIC_HEIGHT}
                    className="ar-mobile-screen-container__image"
                    style={imgStyle}
                />
                <span className="title">{title}</span>
                <p className="description">{description}</p>
            </div>
        );
    }

    if (screenDevice.isMobile) {
        if (!mobileImg) return null;
        return (
            <div {...props} className="ar-mobile-screen-container">
                <ProjectImage
                    objectPath={mobileImg}
                    alt={alt}
                    width={AR_MOBILE_SCREEN_INTRINSIC_WIDTH}
                    height={AR_MOBILE_SCREEN_INTRINSIC_HEIGHT}
                    className="ar-mobile-screen-container__image"
                    style={imgStyle}
                />
                 <span className="title">{title}</span>
                <p className="description">{description}</p>
            </div>
        );
    }

    return null;
}

export default ARMobileScreen;
