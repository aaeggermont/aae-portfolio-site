import React from 'react';
import './MockupIllustration.scss';
import { StaticImageData } from 'next/image';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MockupIllustrationProps {
    alt: string;
    imagesSrc: StaticImageData[];
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
    };

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div {...props} className="mockup-container">
                <span>{title}</span>
                <img src={imagesSrc[0] as unknown as string} alt={alt} style={imgStyle} />
                <p className="description">{description}</p>
            </div>
        );
    } else if (screenDevice.isTablet) {
        return (
            <div {...props} className="mockup-container">
                <span>{title}</span>
                <img src={imagesSrc[1] as unknown as string} alt={alt} style={imgStyle} />
                <p className="description">{description}</p>
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div {...props} className="mockup-container">
                <span className="title">{title}</span>
                <img src={imagesSrc[2] as unknown as string} alt={alt} style={imgStyle} />
                <p className="description">{description}</p>
            </div>
        );
    }

    return null;
}

export default MockupIllustration;
