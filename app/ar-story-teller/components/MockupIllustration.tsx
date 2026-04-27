import React from 'react';
import './MockupIllustration.scss';
import { StaticImageData } from 'next/image';
import ProjectImage from '@/lib/media/ProjectImage';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MockupIllustrationProps {
    alt: string;
    imagesSrc: string[];
    title?: string;
    width?: string;
    description?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MockupIllustration({ alt, imagesSrc, title, width, description, ...props }: MockupIllustrationProps) {
    const screenDevice = useResponsive();

    const imgStyle: React.CSSProperties = {
        alignSelf: 'center',
        paddingTop: '2rem',
        width: '50%',
        height: 'auto',
    };

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div {...props} className="mockup-container">
                <span>{title}</span>
                <ProjectImage
                    objectPath={imagesSrc[0]}
                    alt={alt}
                    width={300}
                    height={300}
                    style={imgStyle} />
                <p className="description">{description}</p>
            </div>
        );
    } else if (screenDevice.isTablet) {
        return (
            <div {...props} className="mockup-container">
                <span>{title}</span>
                <ProjectImage
                    objectPath={imagesSrc[1]}
                    alt={alt}
                    width={300}
                    height={300}
                    style={imgStyle} />
                <p className="description">{description}</p>
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div {...props} className="mockup-container">
                <span className="title">{title}</span>
                <ProjectImage
                    objectPath={imagesSrc[2]}
                    alt={alt}
                    width={300}
                    height={300}
                    style={imgStyle} />
                <p className="description">{description}</p>
            </div>
        );
    }

    return null;
}

export default MockupIllustration;
