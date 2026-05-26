/** Contrast for header/close icons; `lightbox.js` `theme` overwrites `backgroundColor` on mount, so we avoid `theme` and set this explicitly. */
export function lightboxIconColorForModalBackground(background: string): string {
  const t = background.trim().toLowerCase();
  if (t === "transparent") return "#c0c0c0";
  const rgba = t.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgba) {
    const r = +rgba[1];
    const g = +rgba[2];
    const b = +rgba[3];
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#1a1a1a" : "#c0c0c0";
  }
  const hex = t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const v = parseInt(full, 16);
    const r = (v >> 16) & 255;
    const g = (v >> 8) & 255;
    const b = v & 255;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#1a1a1a" : "#c0c0c0";
  }
  return "#c0c0c0";
}

export const PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE = "#ffffff";
