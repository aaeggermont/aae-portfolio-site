import { NETWORK_REF_WIDTH, networkConfig } from "./networkConfig";

export type PortraitNodeRole = "mesh" | "node" | "isolated" | "particle";

export type PortraitNode = {
  x: number;
  y: number;
  outwardX: number;
  outwardY: number;
  /** 0 on the silhouette, 1 at the outer fringe. */
  distance: number;
  role: PortraitNodeRole;
  gold: boolean;
  anchor: boolean;
  /** True when this sample sits on the opaque portrait (jacket overlap). */
  onPortrait: boolean;
  phase: number;
  radius: number;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  zone: "primary" | "secondary";
};

export type PortraitLink = {
  a: number;
  b: number;
  phase: number;
  flickers: boolean;
  alpha: number;
  red: number;
  green: number;
  blue: number;
};

export type PortraitNetwork = {
  nodes: PortraitNode[];
  links: PortraitLink[];
  neighbors: number[][];
};

type Seed = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  zone: "primary" | "secondary";
};

function cellHash(gx: number, gy: number): number {
  let n = Math.imul(gx | 0, 374761393) + Math.imul(gy | 0, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function bucketSeeds(list: Seed[], spacing: number): Seed[] {
  const map = new Map<string, Seed>();
  for (const seed of list) {
    const key = `${Math.round(seed.x / spacing)}:${Math.round(seed.y / spacing)}`;
    if (!map.has(key)) map.set(key, seed);
  }
  return [...map.values()];
}

/**
 * Sample selected alpha-boundary arcs and grow an asymmetric network
 * outward from those edges. The portrait interior is never filled.
 */
export function buildNetwork(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  density: number,
): PortraitNetwork {
  const cfg = networkConfig;
  const unit = width / NETWORK_REF_WIDTH;
  const size = Math.min(1.12, Math.max(0.78, unit));
  const alphaAt = (x: number, y: number) => {
    const xi = Math.max(0, Math.min(width - 1, Math.round(x)));
    const yi = Math.max(0, Math.min(height - 1, Math.round(y)));
    return pixels[(yi * width + xi) * 4 + 3];
  };

  const step = cfg.gradientStep;
  const threshold = cfg.alphaThreshold;
  const raw: Seed[] = [];

  for (let y = step + 1; y < height - step - 1; y++) {
    for (let x = step + 1; x < width - step - 1; x++) {
      const alpha = alphaAt(x, y);
      if (alpha < threshold) continue;
      if (
        alphaAt(x - 1, y) >= threshold &&
        alphaAt(x + 1, y) >= threshold &&
        alphaAt(x, y - 1) >= threshold &&
        alphaAt(x, y + 1) >= threshold
      ) {
        continue;
      }

      const gx = alphaAt(x + step, y) - alphaAt(x - step, y);
      const gy = alphaAt(x, y + step) - alphaAt(x, y - step);
      const glen = Math.hypot(gx, gy) || 1;
      let ox = -gx / glen;
      let oy = -gy / glen;
      if (alphaAt(x + ox * 5, y + oy * 5) > alpha + 8) {
        ox = -ox;
        oy = -oy;
      }

      const nx = x / width;
      const ny = y / height;
      let zone: Seed["zone"] | null = null;
      if (
        ny >= cfg.primary.nyMin &&
        ny <= cfg.primary.nyMax &&
        nx <= cfg.primary.nxMax &&
        ox <= cfg.primary.outwardXMax
      ) {
        zone = "primary";
      } else if (
        ny >= cfg.secondary.nyMin &&
        ny <= cfg.secondary.nyMax &&
        nx >= cfg.secondary.nxMin &&
        ox >= cfg.secondary.outwardXMin
      ) {
        zone = "secondary";
      }
      if (!zone) continue;
      raw.push({ x, y, ox, oy, zone });
    }
  }

  const primarySeeds = bucketSeeds(
    raw.filter((seed) => seed.zone === "primary"),
    (cfg.primary.seedSpacing * unit) / density,
  );
  const secondaryBand = (cfg.secondary.nyMin + cfg.secondary.nyMax) / 2;
  const secondarySeeds = bucketSeeds(
    raw.filter((seed) => seed.zone === "secondary"),
    (cfg.secondary.seedSpacing * unit) / density,
  )
    .sort(
      (a, b) =>
        Math.abs(a.y / height - secondaryBand) - Math.abs(b.y / height - secondaryBand),
    )
    .slice(0, cfg.secondary.maxSeeds);

  const nodes: PortraitNode[] = [];

  const spawn = (
    seeds: Seed[],
    perSeed: number,
    maxReach: number,
    edgeOverlap: number,
  ) => {
    seeds.forEach((seed, seedIndex) => {
      const count = Math.max(2, Math.round(perSeed * density));
      for (let i = 0; i < count; i++) {
        const along = cellHash(Math.round(seed.x) + i * 17, Math.round(seed.y) + seedIndex);
        const reachJitter = cellHash(Math.round(seed.x) + 3, Math.round(seed.y) + i * 11);
        const angleJitter = cellHash(seedIndex + 40, i + 7);
        const distance = Math.pow(along, cfg.distanceBias);
        const reach = maxReach * unit * (0.72 + reachJitter * 0.45);
        const dist = -edgeOverlap * unit + distance * reach;
        const ang =
          Math.atan2(seed.oy, seed.ox) + (angleJitter - 0.5) * cfg.spread * distance;
        const x = seed.x + Math.cos(ang) * dist;
        const y = seed.y + Math.sin(ang) * dist;
        if (x < -width * 0.2 || y < -height * 0.06 || x > width * 1.12 || y > height * 1.06) {
          continue;
        }
        if (alphaAt(x, y) > threshold && dist > 1) continue;

        const nx = x / width;
        const ny = y / height;
        if (ny < cfg.faceNyMax) continue;
        if (seed.zone === "primary" && nx > cfg.primaryContainNx) continue;
        if (
          seed.zone === "secondary" &&
          (nx < cfg.secondaryContainNxMin ||
            ny < cfg.secondaryContainNyMin ||
            ny > cfg.secondaryContainNyMax)
        ) {
          continue;
        }

        const role: PortraitNodeRole =
          distance < cfg.layerMesh
            ? "mesh"
            : distance < cfg.layerNode
              ? "node"
              : distance < cfg.layerIsolated
                ? "isolated"
                : "particle";
        const onPortrait = alphaAt(x, y) > threshold;
        const gold = role !== "particle" && cellHash(Math.round(x) + i, Math.round(y) + 4) < cfg.goldRatio;
        const anchor = role === "mesh" && cellHash(i + 9, seedIndex + 3) < cfg.anchorChance;
        const fade = 1 - distance * 0.62;
        const [tr, tg, tb] = gold ? cfg.gold : onPortrait ? cfg.tealOnPortrait : cfg.teal;
        const baseAlpha = role === "particle" ? cfg.particleOpacity : cfg.nodeOpacity;
        const radius =
          (anchor
            ? cfg.anchorRadius
            : role === "particle"
              ? cfg.particleRadius
              : role === "isolated"
                ? cfg.isolatedRadius
                : cfg.nodeRadius) * size;

        nodes.push({
          x,
          y,
          outwardX: seed.ox,
          outwardY: seed.oy,
          distance,
          role,
          gold,
          anchor,
          onPortrait,
          phase: cellHash(Math.round(x) + 11, Math.round(y) + 19) * Math.PI * 2,
          radius,
          red: tr,
          green: tg,
          blue: tb,
          alpha: baseAlpha * fade,
          zone: seed.zone,
        });
      }
    });
  };

  spawn(primarySeeds, cfg.primary.nodesPerSeed, cfg.primary.maxReach, cfg.primary.edgeOverlap);
  spawn(
    secondarySeeds,
    cfg.secondary.nodesPerSeed,
    cfg.secondary.maxReach,
    cfg.secondary.edgeOverlap,
  );

  const linkable: number[] = [];
  nodes.forEach((node, index) => {
    if (node.role === "mesh" || node.role === "node") linkable.push(index);
  });

  const pairs: { a: number; b: number; d: number }[] = [];
  for (let i = 0; i < linkable.length; i++) {
    const ia = linkable[i];
    const a = nodes[ia];
    const reach =
      (a.role === "mesh" ? cfg.connectionDistanceMesh : cfg.connectionDistanceNode) *
      unit *
      (1 - a.distance * 0.35);
    for (let j = i + 1; j < linkable.length; j++) {
      const ib = linkable[j];
      const b = nodes[ib];
      if (a.zone !== b.zone) continue;
      if (Math.abs(a.distance - b.distance) > cfg.linkDistanceGap) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 4 * unit || d > reach) continue;
      const aInside = alphaAt(a.x, a.y) > threshold;
      const bInside = alphaAt(b.x, b.y) > threshold;
      const midInside = alphaAt((a.x + b.x) / 2, (a.y + b.y) / 2) > threshold;
      if (!aInside && !bInside && midInside && d > cfg.crossBodyReject * unit) continue;
      pairs.push({ a: ia, b: ib, d });
    }
  }

  pairs.sort((a, b) => a.d - b.d);
  const degree = new Array<number>(nodes.length).fill(0);
  const links: PortraitLink[] = [];
  for (const pair of pairs) {
    if (degree[pair.a] >= cfg.maxLinks || degree[pair.b] >= cfg.maxLinks) continue;
    const a = nodes[pair.a];
    const b = nodes[pair.b];
    const avg = (a.distance + b.distance) / 2;
    const flickers =
      Math.min(a.distance, b.distance) > 0.16 &&
      cellHash(pair.a + 5, pair.b + 8) < cfg.linkFlickerPortion;
    const onCloth = a.onPortrait && b.onPortrait;
    const [lr, lg, lb] = onCloth ? cfg.tealOnPortrait : cfg.teal;
    links.push({
      a: pair.a,
      b: pair.b,
      phase: cellHash(Math.round(a.x) + pair.b, Math.round(b.y) + pair.a) * Math.PI * 2,
      flickers,
      alpha: cfg.lineOpacity * (1 - avg * 0.72),
      red: lr,
      green: lg,
      blue: lb,
    });
    degree[pair.a]++;
    degree[pair.b]++;
  }

  const neighbors = nodes.map(() => [] as number[]);
  for (const link of links) {
    neighbors[link.a].push(link.b);
    neighbors[link.b].push(link.a);
  }

  return { nodes, links, neighbors };
}
