'use client';
import './SectionVideo.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionVideoProps {
    title?: string;
    description?: string;
    srcUrl: string;
    width?: string;
    height?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionVideo({ title, description, srcUrl, width, height }: SectionVideoProps) {
    return (
        <div className="storyteller-DesktopParagraphVideo">
            <div className="iframeContainer">
                <iframe
                    src={srcUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    width={width}
                    height={height}
                    title="Pilot Test Evaluation 1"
                />
                <script src="https://player.vimeo.com/api/player.js" />
            </div>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
        </div>
    );
}

export default SectionVideo;
