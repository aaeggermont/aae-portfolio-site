'use client';
import './ProjectOverview.scss';
import ProjectImage from '@/lib/media/ProjectImage';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import type {
    ProjectOverviewColumn,
    ProjectOverviewData,
} from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

interface ProjectOverviewProps {
    data: ProjectOverviewData;
}

const ICON_SIZE = 60;

function OverviewIcon({ objectPath, alt }: { objectPath: string; alt: string }) {
    return (
        <ProjectImage
            objectPath={objectPath}
            alt={alt}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="overview-icon-img"
        />
    );
}

function OverviewColumn({ item }: { item: ProjectOverviewColumn }) {
    return (
        <div className="overview-column">
            <div className="overview-column-icon">
                <OverviewIcon
                    objectPath={item.icon}
                    alt={`${item.title} icon`}
                />
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

function OverviewRow({ item }: { item: ProjectOverviewColumn }) {
    return (
        <div className="overview-row">
            <div className="overview-row-icon">
                <OverviewIcon
                    objectPath={item.icon}
                    alt={`${item.title} icon`}
                />
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

function ProjectOverviewColumns({
    title,
    columns,
}: {
    title: string;
    columns: ProjectOverviewColumn[];
}) {
    return (
        <div className="overview-container">
            <h2 className="overview-title">{title}</h2>
            <div className="overview-columns">
                {columns.map((item) => (
                    <OverviewColumn key={item.title} item={item} />
                ))}
            </div>
        </div>
    );
}

function ProjectOverviewRows({
    title,
    columns,
}: {
    title: string;
    columns: ProjectOverviewColumn[];
}) {
    return (
        <div className="overview-container overview-container--mobile">
            <h2 className="overview-title">{title}</h2>
            <div className="overview-rows">
                {columns.map((item) => (
                    <OverviewRow key={item.title} item={item} />
                ))}
            </div>
        </div>
    );
}

export function ProjectOverview({ data }: ProjectOverviewProps) {
    const screenDevice = useResponsive();
    const { title, columns } = data;

    let content: React.ReactNode = null;

    if (screenDevice.isDesktopOrLaptop || screenDevice.isTablet) {
        content = <ProjectOverviewColumns title={title} columns={columns} />;
    } else if (screenDevice.isMobile) {
        content = <ProjectOverviewRows title={title} columns={columns} />;
    }

    if (!content) {
        return null;
    }

    return <section className="project-overview-pin">{content}</section>;
}

export default ProjectOverview;
