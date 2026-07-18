/**
 * Star positions for the Star Tours dark narrative band.
 * Fixed list keeps SSR/client markup stable (no Math.random in render).
 */
export type StarSpec = {
  /** Horizontal position (%). */
  left: number;
  /** Vertical position (%). */
  top: number;
  /** Diameter in px. */
  size: number;
  /** Base opacity 0–1. */
  opacity: number;
};

/**
 * Deterministic star field (no Math.random). Dense enough to read as a night
 * sky in the gutters, without becoming a full galaxy.
 */
function buildStars(): StarSpec[] {
  const stars: StarSpec[] = [];
  const cols = 34;
  const rows = 42;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const n = row * cols + col;
      // Drop ~12% so it stays irregular, not a perfect lattice.
      if (n % 19 === 0 || n % 23 === 0) continue;

      const jitterX = ((n * 37) % 17) - 8;
      const jitterY = ((n * 53) % 13) - 6;
      const left = Math.min(
        99,
        Math.max(1, (col + 0.5) * (100 / cols) + jitterX * 0.22),
      );
      // Allow stars near the top of the band (mask softens them in the blue fade).
      const top = Math.min(
        99,
        Math.max(2, (row + 0.5) * (100 / rows) + jitterY * 0.28),
      );

      const sizeBucket = n % 6;
      const size =
        sizeBucket === 0 ? 2.25 : sizeBucket <= 2 ? 1.5 : 1.1;
      const opacity =
        sizeBucket === 0
          ? 0.95
          : sizeBucket <= 2
            ? 0.75
            : 0.45 + (n % 4) * 0.08;

      stars.push({ left, top, size, opacity });
    }
  }

  return stars;
}

export const STAR_FIELD_STARS: StarSpec[] = buildStars();
