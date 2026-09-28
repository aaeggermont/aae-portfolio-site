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
 * Continue the baked artwork's left-hand network a short way into empty space.
 * Seeds are limited to the outer alpha fringe, so the live layer does not
 * redraw the mesh already painted into the portrait.
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
  const outerBand = cfg.primary.outerBand * unit;
  const leftEdge = new Int16Array(height);
  leftEdge.fill(-1);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alphaAt(x, y) >= threshold) {
        leftEdge[y] = x;
        break;
      }
    }
  }

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
      const rowEdge = leftEdge[y];
      if (rowEdge < 0 || x > rowEdge + outerBand) continue;
      if (alphaAt(x + ox * 8, y + oy * 8) > threshold) continue;
      if (
        ny < cfg.primary.nyMin ||
        ny > cfg.primary.nyMax ||
        nx > cfg.primary.nxMax ||
        ox > cfg.primary.outwardXMax
      ) {
        continue;
      }
      raw.push({ x, y, ox, oy });
    }
  }

  const primarySeeds = bucketSeeds(raw, (cfg.primary.seedSpacing * unit) / density);

  const nodes: PortraitNode[] = [];

  const spawn = (
    seeds: Seed[],
    perSeed: number,
    maxReach: number,
    edgeOverlap: number,
  ) => {
    seeds.forEach((seed, seedIndex) => {
      const count = Math.max(1, Math.round(perSeed * density));
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
        if (alphaAt(x, y) > 180 && dist > 4 * unit) continue;

        const nx = x / width;
        const ny = y / height;
        if (ny < cfg.faceNyMax) continue;
        if (nx > cfg.primaryContainNx) continue;

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
        const fade = Math.max(0.08, 1 - distance * cfg.opacityFalloff);
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
          zone: "primary",
        });
      }
    });
  };

  spawn(primarySeeds, cfg.primary.nodesPerSeed, cfg.primary.maxReach, cfg.primary.edgeOverlap);

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
      alpha: cfg.lineOpacity * Math.max(0.08, 1 - avg * cfg.opacityFalloff),
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
