import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import './SectionSubTitle.scss';

interface SectionSubTitleProps extends ComponentPropsWithoutRef<'div'> {
    title: string;
    paddingTop?: CSSProperties['paddingTop'];
    paddingBottom?: CSSProperties['paddingBottom'];
}

export function SectionSubTitle({
    title,
    paddingTop,
    paddingBottom,
    className,
    style,
    ...props
}: SectionSubTitleProps) {
    const paddingStyle: CSSProperties = {
        ...(paddingTop !== undefined ? { paddingTop } : {}),
        ...(paddingBottom !== undefined ? { paddingBottom } : {}),
    };

    return (
        <div
            {...props}
            className={['section-sub-title', className].filter(Boolean).join(' ')}
            style={{ ...paddingStyle, ...style }}
        >
            <div className="section-sub-title__label">{title}</div>
        </div>
    );
}

export default SectionSubTitle;
