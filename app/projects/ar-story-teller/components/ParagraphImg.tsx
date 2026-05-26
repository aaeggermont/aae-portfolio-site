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
        }
        return imagesSrc[index]?.src;
    };

    const objectPath =
        screenDevice.isDesktopOrLaptop
            ? getImagePath(0)
            : screenDevice.isTablet
              ? getImagePath(1)
              : getImagePath(2);

    if (!objectPath) {
        return null;
    }

    const hasCaption = Boolean(title?.trim()) || Boolean(description?.trim());

    return (
        <div {...props} className="storyteller-paragraphimg">
            <div className="storyteller-paragraphimg__media">
                <ProjectImage objectPath={objectPath} alt={alt} className="storyteller-paragraphimg__image" />
            </div>
            {hasCaption ? (
                <div className="storyteller-paragraphimg__labels">
                    {title?.trim() ? <p className="storyteller-paragraphimg__title">{title.trim()}</p> : null}
                    {description?.trim() ? (
                        <p className="storyteller-paragraphimg__description">{description.trim()}</p>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default ParagraphImg;
