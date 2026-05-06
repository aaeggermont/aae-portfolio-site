'use client';
import './SectionImg.scss';
import { StaticImageData } from 'next/image';
import ProjectImage from '@/lib/media/ProjectImage';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionImgProps {
    imagesSrc: StaticImageData[];
    alt?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionImg({ imagesSrc, alt, ...props }: SectionImgProps) {
    const screenDevice = useResponsive();
    const desktopImg = imagesSrc?.[0]?.src as unknown as string | undefined;
    const tabletImg = imagesSrc?.[1]?.src as unknown as string | undefined;
    const mobileImg = imagesSrc?.[2]?.src as unknown as string | undefined;

    console.log(imagesSrc, 'imagesSrc');

    if (screenDevice.isDesktopOrLaptop) {
        if (!desktopImg) return null;
        return (
            <div {...props} className="sectionimg-container">
                <ProjectImage
                    objectPath={desktopImg}
                    alt={alt || ''}
                    width={imagesSrc[0]?.width}
                    height={imagesSrc[0]?.height}
                    style={{ paddingTop: '3rem', width: '100%' }} />
            </div>
        );
    } else if (screenDevice.isTablet) {
        if (!tabletImg) return null;
        return (
            <div {...props} className="sectionimg-container">
                <ProjectImage
                    objectPath={tabletImg}
                    alt={alt || ''}
                    width={imagesSrc[1]?.width}
                    height={imagesSrc[1]?.height}
                    style={{ paddingTop: '3rem', width: '100%' }} />
            </div>
        );
    } else if (screenDevice.isMobile) {
        if (!mobileImg) return null;
        return (
            <div {...props}>
                <ProjectImage
                    objectPath={mobileImg}
                    alt={alt || ''}
                    width={imagesSrc[2]?.width}
                    height={imagesSrc[2]?.height}
                    style={{ paddingTop: '1rem', width: '100%' }} />
            </div>
        );
    }

    return null;
}

export default SectionImg;
