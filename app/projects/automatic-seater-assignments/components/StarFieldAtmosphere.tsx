"use client";

import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";

import { STAR_FIELD_STARS, type StarSpec } from "./starFieldStars";
import { useBandParallax } from "./useBandParallax";

const twinkleA = keyframes`
  0%, 100% { opacity: 0.75; }
  50% { opacity: 1; }
`;

const twinkleB = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

/** How strongly stars lag behind scroll (0 = locked to panels, 1 = viewport-fixed). */
const STAR_PARALLAX_FACTOR = 0.22;

/** Extra height on the moving layer so translateY never shows empty edges. */
const PARALLAX_OVERSCAN = "18%";

/**
 * Hard-edged pinpricks — no soft glow falloff (that read as blurry blobs).
 */
function starsToRadialBackground(stars: StarSpec[]): string {
  return stars
    .map((star) => {
      const r = star.size / 2;
      return `radial-gradient(circle ${r}px at ${star.left}% ${star.top}%, rgba(255,255,255,${star.opacity}) 0%, rgba(255,255,255,${star.opacity}) 70%, transparent 71%)`;
    })
    .join(", ");
}

/** Chunk stars so no single `background-image` exceeds browser layer limits. */
function chunkStars(stars: StarSpec[], chunkCount: number): StarSpec[][] {
  const chunks: StarSpec[][] = Array.from({ length: chunkCount }, () => []);
  stars.forEach((star, i) => {
    chunks[i % chunkCount].push(star);
  });
  return chunks;
}

const STAR_CHUNKS = chunkStars(STAR_FIELD_STARS, 6).map(starsToRadialBackground);

type StarFieldAtmosphereProps = {
  className?: string;
};

/**
 * Dense, slow-twinkle star layer for the Star Tours dark narrative band.
 * Subtle scroll parallax vs. panels; disabled under `prefers-reduced-motion`.
 * Decorative only — sits behind content and ignores pointer events.
 */
export default function StarFieldAtmosphere({
  className,
}: StarFieldAtmosphereProps) {
  const parallaxRef = useBandParallax<HTMLDivElement>({
    factor: STAR_PARALLAX_FACTOR,
  });

  return (
    <Box
      className={className}
      aria-hidden
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // Ease in through the blue→black fade so stars read from the
        // start of the Star Tours section, not only deeper in the band.
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 4%, #000 10%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 4%, #000 10%)",
        "@media (prefers-reduced-motion: reduce)": {
          "& [data-star-layer]": {
            animation: "none !important",
            opacity: "0.9 !important",
          },
        },
      }}
    >
      <Box
        ref={parallaxRef}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `-${PARALLAX_OVERSCAN}`,
          bottom: `-${PARALLAX_OVERSCAN}`,
          willChange: "transform",
        }}
      >
        {STAR_CHUNKS.map((backgroundImage, index) => (
          <Box
            key={index}
            data-star-layer=""
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              animation: `${index % 2 === 0 ? twinkleA : twinkleB} ${
                9 + (index % 3) * 2
              }s ease-in-out ${index * 0.6}s infinite`,
              display: index >= 3 ? { xs: "none", md: "block" } : "block",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
