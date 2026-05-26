'use client';
import './ProjectOverview.scss';
import Image, { type StaticImageData } from 'next/image';
import MyRolesIcon from '../Images/MyRolesIcon.png';
import TimelineIcon from '../Images/TimelineIcon.png';
import CategoryIcon from '../Images/CategoryIcon.png';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

interface ProjectOverviewProps {
    title?: string;
    [key: string]: unknown;
}

interface OverviewItem {
    icon: StaticImageData;
    title: string;
    items: string[];
}

/* Hardcoded copy — no data flows into this component yet (see `ArStoryTellerPage`). */
const OVERVIEW_ITEMS: OverviewItem[] = [
    {
        icon: MyRolesIcon,
        title: 'My Roles',
        items: ['Project Lead', 'UX/UI Designer', 'Technology Research'],
    },
    {
        icon: TimelineIcon,
        title: 'Timeline',
        items: ['9 Months'],
    },
    {
        icon: CategoryIcon,
        title: 'Category',
        items: [
            'Extended Reality (XR)',
            'Entertainment',
            'Computer Vision',
            'iOS Mobile Development',
        ],
    },
];

const OVERVIEW_HEADING = 'Project Overview';
const ICON_SIZE = 42;

function OverviewIcon({ icon, alt }: { icon: StaticImageData; alt: string }) {
    return (
        <Image
            alt={alt}
            src={icon}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="overview-icon-img"
        />
    );
}

function OverviewColumn({ item }: { item: OverviewItem }) {
    return (
        <div className="overview-column">
            <div className="overview-column-icon">
                <OverviewIcon icon={item.icon} alt={`${item.title} icon`} />
            </div>
            <div className="overview-column-title">{item.title}</div>
            <ul className="overview-column-items">
                {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}

function OverviewRow({ item }: { item: OverviewItem }) {
    return (
        <div className="overview-row">
            <div className="overview-row-icon">
                <OverviewIcon icon={item.icon} alt={`${item.title} icon`} />
                <div className="overview-row-icon-label">{item.title}</div>
            </div>
            <ul className="overview-row-items">
                {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}

export function ProjectOverview({ title, ...props }: ProjectOverviewProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop || screenDevice.isTablet) {
        return (
            <div {...props} className="overview-container">
                <h2 className="overview-title">{title ?? OVERVIEW_HEADING}</h2>
                <div className="overview-columns">
                    {OVERVIEW_ITEMS.map((item) => (
                        <OverviewColumn key={item.title} item={item} />
                    ))}
                </div>
            </div>
        );
    }

    if (screenDevice.isMobile) {
        return (
            <div {...props} className="overview-container overview-container--mobile">
                <h2 className="overview-title">{title ?? OVERVIEW_HEADING}</h2>
                <div className="overview-rows">
                    {OVERVIEW_ITEMS.map((item) => (
                        <OverviewRow key={item.title} item={item} />
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

export default ProjectOverview;
