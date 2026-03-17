'use client';
import './ParagraphImg.scss';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import Image, { StaticImageData } from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParagraphImgProps {
    alt?: string;
    imagesSrc?: StaticImageData[];
    description?: string;
    title?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParagraphImg({ alt = '', imagesSrc = [], description, title, ...props }: ParagraphImgProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <>
                <div {...props} className="storyteller-paragraphimg">
                    <Image
                        src={imagesSrc[0]}
                        alt={alt}
                        style={{
                            width: '90%',
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
        return (
            <div {...props} className="storyteller-paragraphimg">
                <Image
                    src={imagesSrc[1]}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: 'auto',
                        alignSelf: 'center',
                        paddingTop: '2.5rem',
                    }}
                />
                <div className="description">{description}</div>
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div {...props} className="storyteller-paragraphimg">
                <Image
                    src={imagesSrc[2]}
                    alt={alt}
                    style={{
                        width: '90%',
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
