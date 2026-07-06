/**
 * Vertical spacing between top-level section children inside `.project-content`.
 *
 * Each value is a CSS length string (any unit: `rem`, `px`, `clamp(...)`, etc.) that
 * applies inside the matching breakpoint defined in `styles/variables.scss`:
 *
 * - `mobile`  -> 360 - 767px
 * - `tablet`  -> 768 - 1023px
 * - `desktop` -> 1024px +
 */
export const SECTION_GAPS = {
    mobile: '3rem',
    tablet: '5rem',
    desktop: '8rem',
} as const;

/**
 * Top/bottom padding for full-bleed section bands (`DesignSystemSection`, etc.).
 * Uses the same 3 : 5 : 8 rem scale as `SECTION_GAPS`.
 */
export const FULL_BLEED_BAND_PADDINGS = {
    y: SECTION_GAPS,
} as const;

/**
 * Vertical gap between major blocks inside a full-bleed band (subsection group → panel,
 * paragraph block → carousel, etc.). Mirrors Finding Nemo `PANEL_SECTION_GAPS`.
 */
export const PANEL_SECTION_GAPS = {
    mobile: '42px',
    tablet: '70px',
    desktop: '112px',
} as const;

/**
 * Gap between a heading and immediately following content (subtitle → paragraph,
 * section title → body). Mirrors Finding Nemo `PROBLEM_DEMO_PANEL_TITLE_GAP`.
 */
export const TITLE_CONTENT_GAP = {
    mobile: '32px',
    tablet: '40px',
    desktop: '48px',
} as const;

/** Gap between consecutive paragraphs inside `ParagraphBlock`. */
export const BODY_STACK_GAP = {
    mobile: '16px',
    tablet: '20px',
    desktop: '20px',
} as const;

/**
 * Tighter gap for carousel nav / compact UI rows below a content block.
 * Alias of `TITLE_CONTENT_GAP` — use `--title-content-gap` in CSS when possible.
 */
export const COMPACT_BLOCK_GAP = TITLE_CONTENT_GAP;

/**
 * Standardized usable content dimensions for the AR Story Teller case study.
 *
 * `.project-content` enforces these as `max-width` (outer container cap) and
 * horizontal padding (inner side margins). Mobile is intentionally uncapped so
 * the page fills larger phones while keeping 16px side margins.
 */
export const LAYOUT_DIMENSIONS = {
    mobile: { maxWidth: 'none', margin: '16px' },
    tablet: { maxWidth: '1024px', margin: '40px' },
    desktop: { maxWidth: '1260px', margin: '80px' },
} as const;

/**
 * Padding for inset panel blocks (rounded grey sections, narrative panels, etc.).
 * Vertical values use the case study breakpoints (`variables.scss`): mobile (<768px),
 * tablet (768–1023px), desktop (1024px+).
 *
 * Horizontal values mirror MUI spacing units **3 / 4 / 6** (24 / 32 / 48px at theme
 * `spacing` 8px) applied with the same breakpoint bands for consistency with `py`.
 */
export const PANEL_BLOCK_PADDINGS = {
    y: {
        mobile: '56px',
        tablet: '72px',
        desktop: '90px',
    },
    x: {
        mobile: '24px',
        tablet: '32px',
        desktop: '48px',
    },
} as const;

/**
 * Vertical gap between an in-panel heading and the grey inset surface below it
 * (`InteractionDesignPrinciples`, `UserModeInteractions`, etc.).
 * Matches `TITLE_CONTENT_GAP` — same rhythm as section title → panel shell.
 */
export const PANEL_HEADER_GAP = TITLE_CONTENT_GAP;

/** Horizontal gap between mode image and title/description in `UserModeInteractions`. */
export const INTERACTION_MODE_IMAGE_COPY_GAP = {
    mobile: '24px',
    tablet: '48px',
    desktop: '105px',
} as const;

/** Horizontal space between main carousel slides in `Storyboard` (Embla track). */
export const STORYBOARD_SLIDE_GAP = {
    mobile: '16px',
    tablet: '64px',
    desktop: '128px',
} as const;

/** Main storyboard slide image bounds at desktop (1024px+). */
export const STORYBOARD_MAIN_IMAGE_DESKTOP = {
    maxWidthPx: 600,
    maxHeightPx: 418,
} as const;

export type SectionGaps = typeof SECTION_GAPS;
export type FullBleedBandPaddings = typeof FULL_BLEED_BAND_PADDINGS;
export type PanelSectionGaps = typeof PANEL_SECTION_GAPS;
export type TitleContentGap = typeof TITLE_CONTENT_GAP;
export type BodyStackGap = typeof BODY_STACK_GAP;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;
export type PanelBlockPaddings = typeof PANEL_BLOCK_PADDINGS;
export type PanelHeaderGap = typeof PANEL_HEADER_GAP;
export type InteractionModeImageCopyGap = typeof INTERACTION_MODE_IMAGE_COPY_GAP;
export type StoryboardSlideGap = typeof STORYBOARD_SLIDE_GAP;

export const cssLengthToPx = (value: string): number => Number.parseFloat(value);

export const getUsableLayoutWidth = (
    breakpoint: keyof Omit<LayoutDimensions, 'mobile'>,
): number => {
    const { maxWidth, margin } = LAYOUT_DIMENSIONS[breakpoint];
    return cssLengthToPx(maxWidth) - cssLengthToPx(margin) * 2;
};

/** Desktop usable content width (`1260 − 2 × 80`) — shared panel cap across case study. */
export const PANEL_CONTENT_MAX_WIDTH_PX = getUsableLayoutWidth('desktop');

/**
 * Cinematic main demo canvas (16:9). Desktop 1100×620; tablet ~900×506.
 * Mobile fills available width at the same aspect ratio.
 */
export const MAIN_DEMO_CANVAS = {
    desktop: { width: 1100, height: 620 },
    tablet: { width: 900, height: 506 },
} as const;

type PanelPaddingBreakpoint = keyof PanelBlockPaddings['x'];

/** Content width inside a capped panel after horizontal `PANEL_BLOCK_PADDINGS`. */
export const getPanelInnerWidthPx = (
    breakpoint: PanelPaddingBreakpoint,
    panelMaxWidthPx: number = PANEL_CONTENT_MAX_WIDTH_PX,
): number =>
    panelMaxWidthPx - cssLengthToPx(PANEL_BLOCK_PADDINGS.x[breakpoint]) * 2;
