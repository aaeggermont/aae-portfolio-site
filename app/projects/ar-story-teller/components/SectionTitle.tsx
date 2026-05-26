import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import './SectionTitle.scss';

interface SectionTitleProps extends ComponentPropsWithoutRef<'div'> {
    title: string;
    paddingTop?: CSSProperties['paddingTop'];
    paddingBottom?: CSSProperties['paddingBottom'];
}

export function SectionTitle({
    title,
    paddingTop,
    paddingBottom,
    className,
    style,
    ...props
}: SectionTitleProps) {
    const paddingStyle: CSSProperties = {
        ...(paddingTop !== undefined ? { paddingTop } : {}),
        ...(paddingBottom !== undefined ? { paddingBottom } : {}),
    };

    return (
        <div
            {...props}
            className={['section-title', className].filter(Boolean).join(' ')}
            style={{ ...paddingStyle, ...style }}
        >
            <div className="section-title__label">{title}</div>
        </div>
    );
}

export default SectionTitle;
