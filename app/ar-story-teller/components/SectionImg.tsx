'use client';
import './SectionImg.scss';
import Image, { StaticImageData } from 'next/image';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionImgProps {
    imagesSrc: StaticImageData[];
    alt?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionImg({ imagesSrc, alt, ...props }: SectionImgProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div {...props} className="sectionimg-container">
                <Image
                    src={imagesSrc[0] as unknown as string}
                    alt={alt || ''}
                    style={{ paddingTop: '3rem', width: '100%' }} />
            </div>
        );
    } else if (screenDevice.isTablet) {
        return (
            <div {...props} className="sectionimg-container">
                <Image
                    src={imagesSrc[1] as unknown as string}
                    alt={alt || ''}
                    style={{ paddingTop: '3rem', width: '100%' }} />
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div {...props}>
                <Image
                    src={imagesSrc[2] as unknown as string}
                    alt={alt || ''}
                    style={{ paddingTop: '1rem', width: '100%' }} />
            </div>
        );
    }

    return null;
}

export default SectionImg;
