'use client';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import './ParagraphImg.scss';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import { StaticImageData } from 'next/image';
import ProjectImage from '@/lib/media/ProjectImage';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParagraphImgProps extends ComponentPropsWithoutRef<'div'> {
    alt?: string;
    imagesSrc?: StaticImageData[] | string[];
    description?: string;
    title?: string;
    /** Image + caption width as % of parent (1–100). Omit to use SCSS defaults per breakpoint. */
    widthPercent?: number;
}

function clampWidthPercent(value: number): number {
    return Math.min(100, Math.max(1, value));
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParagraphImg({
    alt = '',
    imagesSrc = [],
    description,
    title,
    widthPercent,
    className,
    style,
    ...props
}: ParagraphImgProps) {
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

    const rootStyle: CSSProperties = {
        ...(widthPercent !== undefined
            ? {
                  ['--paragraph-img-width' as string]: `${clampWidthPercent(widthPercent)}%`,
              }
            : {}),
        ...style,
    };

    return (
        <div
            {...props}
            className={['storyteller-paragraphimg', className].filter(Boolean).join(' ')}
            style={rootStyle}
        >
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
