'use client';
import './ParagraphImg.scss';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import { StaticImageData } from 'next/image';
import ProjectImage from '@/lib/media/ProjectImage';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParagraphImgProps {
    alt?: string;
    imagesSrc?: StaticImageData[] | string[];
    description?: string;
    title?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParagraphImg({ alt = '', imagesSrc = [], description, title, ...props }: ParagraphImgProps) {
    const screenDevice = useResponsive();

    const getImagePath = (index: number) => {
        if (typeof imagesSrc[index] === 'string') {
            return imagesSrc[index];
        } else {
            return imagesSrc[index]?.src;
        }
    };

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <>
                <div {...props} className="storyteller-paragraphimg">
                    <ProjectImage
                        objectPath={getImagePath(0)}
                        alt={alt}
                        width={imagesSrc[0]?.width}
                        height={imagesSrc[0]?.height}
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
                <ProjectImage
                    objectPath={getImagePath(1)}
                    alt={alt}
                    width={imagesSrc[1]?.width}
                    height={imagesSrc[1]?.height}
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
                <ProjectImage
                    objectPath={getImagePath(2)}
                    alt={alt}
                    width={imagesSrc[2]?.width}
                    height={imagesSrc[2]?.height}
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
