import './BlockTitle.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlockTitleProps {
    title: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BlockTitle({ title, ...props }: BlockTitleProps) {
    return (
        <>
            <div {...props} className="block-title">{title}</div>
        </>
    );
}

export default BlockTitle;
