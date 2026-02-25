'use client';
import './ParagraphImg.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import { StaticImageData } from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParagraphImgProps {
    alt?: string;
    width?: string;
    imagesSrc: StaticImageData[];
    description?: string;
    title?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParagraphImg({ alt, width, imagesSrc, description, title, ...props }: ParagraphImgProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        const resolvedWidth = width ?? '90%';
        return (
            <>
                <div {...props} className="storyteller-paragraphimg">
                    <img
                        src={imagesSrc[0] as unknown as string}
                        alt={alt}
                        style={{ alignSelf: 'center', paddingTop: '3rem', width: resolvedWidth }}
                    />
                    <div className="description"><p>{description}</p></div>
                </div>
            </>
        );
    } else if (screenDevice.isTablet) {
        const resolvedWidth = width ?? '100%';
        return (
            <div {...props} className="storyteller-paragraphimg">
                <img
                    src={imagesSrc[1] as unknown as string}
                    alt={alt}
                    style={{ width: resolvedWidth, alignSelf: 'center', paddingTop: '2.5rem' }}
                />
                <div className="description">{description}</div>
            </div>
        );
    } else if (screenDevice.isMobile) {
        const resolvedWidth = width ?? '90%';
        return (
            <div {...props} className="storyteller-paragraphimg">
                <img
                    src={imagesSrc[2] as unknown as string}
                    alt={alt}
                    style={{ width: resolvedWidth, paddingTop: '3rem' }}
                />
                {title ? <div className="title">{title}</div> : null}
                <div className="description">{description}</div>
            </div>
        );
    }

    return null;
}

export default ParagraphImg;
