/**
 * Art direction for the landing portrait network.
 * Distances are in CSS pixels at a portrait width of NETWORK_REF_WIDTH
 * and scale with the rendered photo width.
 */

export const NETWORK_REF_WIDTH = 400;

export const networkConfig = {
  alphaThreshold: 48,
  /** Pixel step used when estimating the outward silhouette normal. */
  gradientStep: 3,

  primary: {
    nyMin: 0.4,
    nyMax: 0.92,
    nxMax: 0.48,
    /** Outward normal x must be below this (pointing to the viewer's left). */
    outwardXMax: -0.28,
    seedSpacing: 13,
    nodesPerSeed: 8,
    maxReach: 78,
    edgeOverlap: 16,
  },

  secondary: {
    nyMin: 0.44,
    nyMax: 0.52,
    nxMin: 0.62,
    outwardXMin: 0.55,
    seedSpacing: 16,
    maxSeeds: 3,
    nodesPerSeed: 4,
    maxReach: 36,
    edgeOverlap: 6,
  },

  /** Exponents above 1 pack more samples against the silhouette. */
  distanceBias: 1.55,
  /** Angular scatter, in radians, at the outer end of a seed's reach. */
  spread: 1.15,
  layerMesh: 0.18,
  layerNode: 0.42,
  layerIsolated: 0.68,

  connectionDistanceMesh: 32,
  connectionDistanceNode: 22,
  maxLinks: 3,
  /** Nodes farther apart than this along the falloff do not connect. */
  linkDistanceGap: 0.34,
  /**
   * Outside-to-outside links longer than this are dropped when their
   * midpoint sits inside the body, so chords do not cross the torso.
   */
  crossBodyReject: 16,

  lineOpacity: 0.46,
  nodeOpacity: 0.82,
  particleOpacity: 0.42,
  /** CSS pixels. Kept thin on purpose; not scaled fully with portrait size. */
  lineWidth: 0.9,

  teal: [7 / 255, 67 / 255, 95 / 255] as const,
  /** Same hue, lifted so the few nodes that overlap the dark jacket stay visible. */
  tealOnPortrait: [78 / 255, 140 / 255, 158 / 255] as const,
  gold: [245 / 255, 159 / 255, 10 / 255] as const,
  /** Share of non-particle nodes drawn in the gold accent. */
  goldRatio: 0.13,
  anchorChance: 0.07,
  nodeRadius: 1.5,
  anchorRadius: 3.2,
  isolatedRadius: 1.15,
  particleRadius: 0.8,

  /** Multiplier on seed count below the mobile breakpoint. */
  mobileDensity: 0.62,
  mobileMaxWidth: 767,

  driftAmplitude: 1.15,
  particleDrift: 3.4,
  driftTimeScale: 0.00022,
  /** Fraction of outer links that slowly fade in and out. */
  linkFlickerPortion: 0.22,
  linkFlickerSpeed: 0.00028,
  pulseIntervalMs: 6800,
  pulseDurationMs: 1700,
  pulseBoost: 0.5,
  pulseSteps: 5,

  spring: 0.05,
  damp: 0.9,
  pointerRadius: 78,
  /** Maximum lean toward the pointer, in CSS pixels at the reference width. */
  pointerInfluence: 4.2,

  /** Extra canvas around the photo so the fringe is not clipped, as a fraction of photo size. */
  padLeft: 0.1,
  padRight: 0.06,
  padTop: 0.04,
  padBottom: 0.04,

  /** Spawned samples above this normalized height are dropped so the face stays clear. */
  faceNyMax: 0.38,
  /** Primary samples cannot cross into the torso. */
  primaryContainNx: 0.56,
  secondaryContainNxMin: 0.55,
  secondaryContainNyMin: 0.4,
  secondaryContainNyMax: 0.6,
};
