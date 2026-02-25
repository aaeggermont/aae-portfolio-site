import React from 'react';
import BulletPoint from './BulletPoint';
import './BulletPoints.scss';
import SubTitle from './SubTitle';
import { StaticImageData } from 'next/image';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BulletPointItem {
    icon?: StaticImageData;
    text: string;
}

interface BulletPointsProps {
    text?: string;
    title?: string;
    subTitle?: string;
    bulletPoints: BulletPointItem[];
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BulletPoints({ text, title, subTitle, bulletPoints, ...props }: BulletPointsProps) {
    const subTitleRender = (subTitle?: string) =>
        subTitle === undefined ? '' : <SubTitle subTitle={subTitle} />;

    const bulletPointsRender = bulletPoints.map((bulletPoint, index) => (
        <BulletPoint
            key={index}
            icon={bulletPoint.icon}
            text={bulletPoint.text}
        />
    ));

    return (
        <div {...props}>
            {subTitleRender(subTitle)}
            {bulletPointsRender}
        </div>
    );
}

export default BulletPoints;
