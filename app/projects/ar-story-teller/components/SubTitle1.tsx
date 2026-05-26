'use client';
import './SubTitle1.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubTitle1Props {
    subTitle: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SubTitle1({ subTitle }: SubTitle1Props) {
    return (
        <>
            <div className="st-subtitle1-container">
                <div className="subtitle-paragraph">{subTitle}</div>
            </div>
        </>
    );
}

export default SubTitle1;
