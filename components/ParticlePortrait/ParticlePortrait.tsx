"use client";

import { useEffect, useRef } from "react";

/**
 * Stippled portrait with scatter → spring-back motion, in the spirit of creative
 * portfolio particle portraits (e.g. https://tishukov.com/ — dense points, fluid mouse response).
 */
type ParticlePortraitProps = {
  src: string;
  className?: string;
};

function cellHash(gx: number, gy: number): number {
  let n = gx * 374761393 + gy * 668265263;
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function drawImageCoverBottom(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dW: number,
  dH: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const scale = Math.max(dW / iw, dH / ih);
  const sw = dW / scale;
  const sh = dH / scale;
  const sx = Math.max(0, Math.min(iw - sw, (iw - sw) * 0.5));
  const sy = Math.max(0, ih - sh);
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dW, dH);
}

const SPRING = 0.22;
const DAMP = 0.86;
const MOUSE_R = 155;
const MOUSE_PUSH = 7.2;
const COLOR_MIX = 0.55;
const KINETIC_STOP = 0.35;
const FRAMES_IDLE_STOP = 18;

export default function ParticlePortrait({ src, className }: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const idleFramesRef = useRef(0);

  /** Mutable sim state — rebuilt on resize / image load */
  const simRef = useRef<{
    w: number;
    h: number;
    dpr: number;
    n: number;
    hx: Float32Array;
    hy: Float32Array;
    x: Float32Array;
    y: Float32Array;
    vx: Float32Array;
    vy: Float32Array;
    rad: Float32Array;
    cr: Float32Array;
    cg: Float32Array;
    cb: Float32Array;
    ca: Float32Array;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current ?? canvas?.parentElement;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    const teardown: (() => void)[] = [];

    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const buildSim = (w: number, h: number, dpr: number, pixels: Uint8ClampedArray) => {
      const gap = 5;
      const skipThreshold = 0.96;
      const jitter = gap * 0.2;

      const hxList: number[] = [];
      const hyList: number[] = [];
      const radList: number[] = [];
      const crList: number[] = [];
      const cgList: number[] = [];
      const cbList: number[] = [];
      const caList: number[] = [];

      let gy = 0;
      for (let y = 0; y < h; y += gap, gy++) {
        let gx = 0;
        for (let x = 0; x < w; x += gap, gx++) {
          if (cellHash(gx, gy) > skipThreshold) continue;

          const jx = (cellHash(gx + 17, gy + 3) - 0.5) * jitter;
          const jy = (cellHash(gx, gy + 9) - 0.5) * jitter;
          const px = Math.min(w - 1, Math.max(0, Math.round(x + jx)));
          const py = Math.min(h - 1, Math.max(0, Math.round(y + jy)));

          const index = (py * w + px) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];

          if (alpha < 38) continue;

          const brightness = (r + g + b) / 3;
          const darkness = 1 - brightness / 255;
          if (darkness < 0.055) continue;

          const breathe = 0.93 + cellHash(gx + 31, gy + 7) * 0.12;
          const rad = Math.min(
            1.22,
            Math.max(0.26, (0.1 + darkness * darkness * 2.05) * breathe),
          );

          const fr = r * COLOR_MIX + 18 * (1 - COLOR_MIX);
          const fg = g * COLOR_MIX + 18 * (1 - COLOR_MIX);
          const fb = b * COLOR_MIX + 20 * (1 - COLOR_MIX);
          const ca = 0.14 + Math.min(0.82, darkness * 0.88 + 0.06 * (brightness / 255));

          hxList.push(px);
          hyList.push(py);
          radList.push(rad);
          crList.push(fr);
          cgList.push(fg);
          cbList.push(fb);
          caList.push(ca);
        }
      }

      const n = hxList.length;
      const hx = new Float32Array(n);
      const hy = new Float32Array(n);
      const x = new Float32Array(n);
      const y = new Float32Array(n);
      const vx = new Float32Array(n);
      const vy = new Float32Array(n);
      const rad = new Float32Array(n);
      const cr = new Float32Array(n);
      const cg = new Float32Array(n);
      const cb = new Float32Array(n);
      const ca = new Float32Array(n);

      for (let i = 0; i < n; i++) {
        hx[i] = hxList[i];
        hy[i] = hyList[i];
        x[i] = hxList[i];
        y[i] = hyList[i];
        rad[i] = radList[i];
        cr[i] = crList[i];
        cg[i] = cgList[i];
        cb[i] = cbList[i];
        ca[i] = caList[i];
      }

      simRef.current = { w, h, dpr, n, hx, hy, x, y, vx, vy, rad, cr, cg, cb, ca };
    };

    const drawFrame = () => {
      if (disposed) {
        stopLoop();
        return;
      }
      const sim = simRef.current;
      if (!sim || !canvas || !ctx) return;

      const { w, h, dpr, n, hx, hy, x, y, vx, vy, rad, cr, cg, cb, ca } = sim;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      let kinetic = 0;

      for (let i = 0; i < n; i++) {
        let fx = (hx[i] - x[i]) * SPRING;
        let fy = (hy[i] - y[i]) * SPRING;

        const dx = x[i] - mx;
        const dy = y[i] - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.5 && dist < MOUSE_R) {
          const t = 1 - dist / MOUSE_R;
          const push = MOUSE_PUSH * t * t;
          fx += (dx / dist) * push;
          fy += (dy / dist) * push;
        }

        const nvx = (vx[i] + fx) * DAMP;
        const nvy = (vy[i] + fy) * DAMP;
        vx[i] = nvx;
        vy[i] = nvy;
        x[i] += nvx;
        y[i] += nvy;
        kinetic += nvx * nvx + nvy * nvy;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.arc(x[i], y[i], rad[i], 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr[i] | 0},${cg[i] | 0},${cb[i] | 0},${ca[i]})`;
        ctx.fill();
      }

      const mouseOff = mx < -1000;
      if (kinetic < KINETIC_STOP && mouseOff) {
        idleFramesRef.current += 1;
        if (idleFramesRef.current >= FRAMES_IDLE_STOP) {
          stopLoop();
          return;
        }
      } else {
        idleFramesRef.current = 0;
      }

      if (disposed) return;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const kickLoop = () => {
      idleFramesRef.current = 0;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const layoutAndSeed = () => {
      if (disposed) return;
      const w = Math.max(1, Math.floor(wrap.clientWidth));
      const h = Math.max(1, Math.floor(wrap.clientHeight));
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offscreen.width = w;
      offscreen.height = h;
      drawImageCoverBottom(offCtx, image, 0, 0, w, h);
      const pixels = offCtx.getImageData(0, 0, w, h).data;

      stopLoop();
      buildSim(w, h, dpr, pixels);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const sim = simRef.current;
      if (sim) {
        for (let i = 0; i < sim.n; i++) {
          ctx.beginPath();
          ctx.arc(sim.x[i], sim.y[i], sim.rad[i], 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sim.cr[i] | 0},${sim.cg[i] | 0},${sim.cb[i] | 0},${sim.ca[i]})`;
          ctx.fill();
        }
      }
    };

    image.onload = () => {
      if (disposed) return;
      layoutAndSeed();

      const onResize = () => layoutAndSeed();

      const onMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        kickLoop();
      };

      const onLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
        kickLoop();
      };

      window.addEventListener("resize", onResize);
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);

      const ro =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => {
              if (!disposed) layoutAndSeed();
            })
          : null;
      ro?.observe(wrap);

      teardown.push(() => {
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
        ro?.disconnect();
        stopLoop();
        simRef.current = null;
      });
    };

    return () => {
      disposed = true;
      image.onload = null;
      teardown.forEach((fn) => fn());
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
}
