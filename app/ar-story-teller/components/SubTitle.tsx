import './SubTitle.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubTitleProps {
    subTitle: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SubTitle({ subTitle }: SubTitleProps) {
    const screen = useResponsive();

    if (screen.isMobile) {
        return (
            <>
                <div className="xssm-subtitle-container">
                    <div className="subtitle-paragraph">{subTitle}</div>
                </div>
            </>
        );
    } else if (screen.isDesktopOrLaptop) {
        return (
            <>
                <div className="lgmd-subtitle-container">
                    <div className="subtitle-paragraph">{subTitle}</div>
                </div>
            </>
        );
    }
    return null;
}

export default SubTitle;
