'use client';
import './BulletPoint.scss';
import Image, { StaticImageData } from 'next/image';
import BulletPointDesktop from '../Images/BulletPoint-Desktop.svg';
import BulletPointLgMd from '../Images/BulletPoint-LgMd.svg';
import BulletPointSmSx from '../Images/BulletPoint-SmSx.png';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

interface BulletPointProps {
    text: string;
    icon?: StaticImageData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BulletPoint({ text, icon }: BulletPointProps) {
    const screen = useResponsive();

    if (screen.isTablet) {
        return (
            <>
                <div className="st-bulletPoint">
                    <div className="bullet-point">
                        <Image alt='bullet-point' src={BulletPointDesktop} style={{ width: '10px', height: '10px', opacity: '95%' }} />
                    </div>
                    <p className="text-paragraph">{text}</p>
                </div>
            </>
        );
    } else if (screen.isDesktopOrLaptop) {
        return (
            <>
                <div className="st-bulletPoint">
                    <div className="bullet-point">
                        <Image alt='bullet-point' src={BulletPointLgMd} style={{ width: '8px', height: '8px' }} />
                    </div>
                    <p className="text-paragraph">{text}</p>
                </div>
            </>
        );
    } else if (screen.isMobile) {
        return (
            <>
                <div className="st-bulletPoint">
                    <div className="bullet-point">
                        <Image alt='bullet-point' src={BulletPointSmSx} style={{ width: '8px', height: '8px' }} />
                    </div>
                    <p className="text-paragraph">{text}</p>
                </div>
            </>
        );
    }

    return null;
}

export default BulletPoint;
