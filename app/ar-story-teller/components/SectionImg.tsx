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

    console.log(imagesSrc, 'imagesSrc');

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div {...props} className="sectionimg-container">
                <ProjectImage
                    objectPath={imagesSrc[0]?.src as unknown as string}
                    alt={alt || ''}
                    width={imagesSrc[0]?.width}
                    height={imagesSrc[0]?.height}
                    style={{ paddingTop: '3rem', width: '100%' }} />
            </div>
        );
    } else if (screenDevice.isTablet) {
        return (
            <div {...props} className="sectionimg-container">
                <ProjectImage
                    objectPath={imagesSrc[1]?.src as unknown as string}
                    alt={alt || ''}
                    width={imagesSrc[1]?.width}
                    height={imagesSrc[1]?.height}
                    style={{ paddingTop: '3rem', width: '100%' }} />
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div {...props}>
                <ProjectImage
                    objectPath={imagesSrc[2]?.src as unknown as string}
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
