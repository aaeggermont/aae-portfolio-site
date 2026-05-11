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

export type SectionGaps = typeof SECTION_GAPS;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;

export const cssLengthToPx = (value: string): number => Number.parseFloat(value);

export const getUsableLayoutWidth = (
    breakpoint: keyof Omit<LayoutDimensions, 'mobile'>,
): number => {
    const { maxWidth, margin } = LAYOUT_DIMENSIONS[breakpoint];
    return cssLengthToPx(maxWidth) - cssLengthToPx(margin) * 2;
};
