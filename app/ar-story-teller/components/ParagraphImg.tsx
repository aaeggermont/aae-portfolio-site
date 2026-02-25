'use client';
import './ParagraphImg.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import Image, { StaticImageData } from 'next/image';

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

export function ParagraphImg({ alt = '', width, imagesSrc, description, title, ...props }: ParagraphImgProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        const resolvedWidth = width ?? '90%';
        return (
            <>
                <div {...props} className="storyteller-paragraphimg">
                    <Image
                        src={imagesSrc[0]}
                        alt={alt}
                        style={{
                            width: resolvedWidth,
                            height: 'auto',
                            alignSelf: 'center',
                            paddingTop: '3rem',
                        }}
                    />
                    <div className="description"><p>{description}</p></div>
                </div>
            </>
        );
    } else if (screenDevice.isTablet) {
        const resolvedWidth = width ?? '100%';
        return (
            <div {...props} className="storyteller-paragraphimg">
                <Image
                    src={imagesSrc[1]}
                    alt={alt}
                    style={{
                        width: resolvedWidth,
                        height: 'auto',
                        alignSelf: 'center',
                        paddingTop: '2.5rem',
                    }}
                />
                <div className="description">{description}</div>
            </div>
        );
    } else if (screenDevice.isMobile) {
        const resolvedWidth = width ?? '90%';
        return (
            <div {...props} className="storyteller-paragraphimg">
                <Image
                    src={imagesSrc[2]}
                    alt={alt}
                    style={{
                        width: resolvedWidth,
                        height: 'auto',
                        paddingTop: '3rem',
                    }}
                />
                {title ? <div className="title">{title}</div> : null}
                <div className="description">{description}</div>
            </div>
        );
    }

    return null;
}

export default ParagraphImg;
