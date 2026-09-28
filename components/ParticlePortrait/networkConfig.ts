/**
 * Live extension of the baked hero artwork.
 * The portrait image already contains the mesh. These values only grow a
 * sparse continuation off its outer left edge.
 *
 * Distances are CSS pixels at NETWORK_REF_WIDTH and scale with the photo width.
 */

export const NETWORK_REF_WIDTH = 400;

export const networkConfig = {
  /** Low enough to catch the soft outer fringe of the baked treatment. */
  alphaThreshold: 26,
  gradientStep: 3,

  primary: {
    /** Shoulder through lower-left edge. The head and right side are excluded. */
    nyMin: 0.38,
    nyMax: 0.9,
    nxMax: 0.46,
    /** Outward normal must point toward the viewer's left. */
    outwardXMax: -0.22,
    /**
     * Only the outermost alpha edge counts. Interior holes in the baked
     * mesh are ignored so the live layer does not redraw it.
     */
    outerBand: 12,
    seedSpacing: 36,
    nodesPerSeed: 2,
    maxReach: 58,
    /** Pulls a few samples back onto the baked fringe. */
    edgeOverlap: 9,
  },

  /** Above 1 keeps more of the sparse samples against the artwork. */
  distanceBias: 1.85,
  spread: 0.72,
  /** Only the nearest samples may connect. Everything past this is a particle. */
  layerMesh: 0.06,
  layerNode: 0.16,
  layerIsolated: 0.3,

  connectionDistanceMesh: 34,
  connectionDistanceNode: 22,
  maxLinks: 2,
  linkDistanceGap: 0.24,
  crossBodyReject: 14,

  lineOpacity: 0.32,
  nodeOpacity: 0.62,
  particleOpacity: 0.34,
  /** How quickly marks fade as they leave the silhouette. 1 hides the outer end. */
  opacityFalloff: 0.9,
  lineWidth: 0.75,

  /** Sampled from the cyan nodes in the hero artwork. */
  teal: [96 / 255, 178 / 255, 222 / 255] as const,
  tealOnPortrait: [96 / 255, 178 / 255, 222 / 255] as const,
  /** Sampled from the warm gold nodes in the hero artwork. */
  gold: [244 / 255, 184 / 255, 84 / 255] as const,
  goldRatio: 0.1,
  anchorChance: 0.04,
  nodeRadius: 1.25,
  anchorRadius: 2.15,
  isolatedRadius: 1.05,
  particleRadius: 0.7,

  mobileDensity: 0.55,
  mobileMaxWidth: 767,

  driftAmplitude: 0.65,
  particleDrift: 2.1,
  driftTimeScale: 0.00011,
  linkFlickerPortion: 0.4,
  linkFlickerSpeed: 0.00016,
  pulseIntervalMs: 14000,
  pulseDurationMs: 2200,
  pulseBoost: 0.22,
  pulseSteps: 3,

  spring: 0.04,
  damp: 0.92,
  pointerRadius: 64,
  pointerInfluence: 2.2,

  padLeft: 0.12,
  padRight: 0.02,
  padTop: 0.02,
  padBottom: 0.03,

  faceNyMax: 0.36,
  primaryContainNx: 0.46,
};
