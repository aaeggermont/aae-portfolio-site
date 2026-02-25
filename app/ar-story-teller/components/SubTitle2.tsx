'use client';
import './SubTitle2.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubTitle2Props {
    subTitle: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SubTitle2({ subTitle }: SubTitle2Props) {
    return (
        <>
            <div className="st-subtitle2-container">
                <div className="subtitle-paragraph">{subTitle}</div>
            </div>
        </>
    );
}

export default SubTitle2;
