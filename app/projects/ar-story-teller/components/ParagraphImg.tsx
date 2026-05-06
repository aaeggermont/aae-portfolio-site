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

    const desktopImg = getImagePath(0);
    const tabletImg = getImagePath(1);
    const mobileImg = getImagePath(2);

    if (screenDevice.isDesktopOrLaptop) {
        if (!desktopImg) return null;
        return (
            <>
                <div {...props} className="storyteller-paragraphimg">
                    <ProjectImage
                        objectPath={desktopImg}
                        alt={alt}
                        style={{
                            width: '100px',
                            height: 'auto',
                            alignSelf: 'center',
                            paddingTop: '3rem',
                        }}
                    />
                    {/* <div className="description"><p>{description}</p></div> */}
                </div>
            </>
        );
    } else if (screenDevice.isTablet) {
        if (!tabletImg) return null;
        return (
            <div {...props} className="storyteller-paragraphimg">
                <ProjectImage
                    objectPath={tabletImg}
                    alt={alt}
                    style={{
                        width: '100px',
                        height: 'auto',
                        alignSelf: 'center',
                        paddingTop: '2.5rem',
                    }}
                />
                {/* <div className="description">{description}</div> */}
            </div>
        );
    } else if (screenDevice.isMobile) {
        if (!mobileImg) return null;
        return (
            <div {...props} className="storyteller-paragraphimg">
                <ProjectImage
                    objectPath={mobileImg}
                    alt={alt}
                    style={{
                        width: '100px',
                        height: 'auto',
                        paddingTop: '3rem',
                    }}
                />
                {title ? <div className="title">{title}</div> : null}
                {/* <div className="description">{description}</div> */}
            </div>
        );
    }

    return null;
}

export default ParagraphImg;
