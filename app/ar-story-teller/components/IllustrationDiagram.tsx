import React, { useEffect } from 'react';
import './IllustrationDiagram.scss';
// import { SlideshowLightbox, initLightboxJS } from 'lightbox.js-react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { StaticImageData } from 'next/image';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IllustrationDiagramProps {
    alt?: string;
    images?: StaticImageData[];
    title?: string;
    description?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IllustrationDiagram({ alt, images = [], title, description, ...props }: IllustrationDiagramProps) {
    const screen = useResponsive();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        // initLightboxJS('individual');
    });

    if (screen.isMobile) {
        return (
            <div className="mobile-illlustration-container">
                <div className="illustration-title">{title}</div>
                <div className="image-container">
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[images[1]]}
                        plugins={[Fullscreen]}
                    />
                    {/* <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto" showThumbnails={false}>
                        <img
                            className="w-full rounded"
                            src={images[1] as unknown as string}
                            alt={alt}
                            style={{ maxWidth: '100%', minWidth: '100%', paddingTop: '10px' }}
                        />
                    </SlideshowLightbox> */}
                </div>
                <span className="text-description">{description}</span>
            </div>
        );
    } else if (screen.isDesktopOrLaptop) {
        return (
            <div className="tablet-illlustration-container">
                <div className="illustration-title">{title}</div>
                <div className="image-container">
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[images[2]]}
                        plugins={[Fullscreen]}
                    />
                    {/* <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto" showThumbnails={false}>
                        <img
                            className="w-full rounded"
                            src={images[2] as unknown as string}
                            alt={alt}
                            style={{ maxWidth: '80%', minWidth: '80%', paddingTop: '1px' }}
                        />
                    </SlideshowLightbox> */}
                </div>
                <span className="text-description">{description}</span>
            </div>
        );
    }

    return null;
}

export default IllustrationDiagram;
