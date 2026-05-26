/** Tracks when all parallax header images for the active viewport have finished loading. */
export function createProjectHeaderLayersReadyGate() {
  let settled = false;
  let resolveReady!: () => void;

  const promise = new Promise<void>((resolve) => {
    resolveReady = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
  });

  return {
    promise,
    markReady: () => resolveReady(),
  };
}

/** Cloud parallax layers + crowd strip per viewport variant. */
export const PROJECT_HEADER_LAYER_COUNT = 5;
