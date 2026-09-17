/** Tracks when the project header has mounted and reported ready (text-only for Phase A). */
export function createProjectHeaderReadyGate() {
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
