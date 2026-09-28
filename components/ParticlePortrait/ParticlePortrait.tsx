"use client";

import { useEffect, useRef } from "react";
import { buildNetwork, type PortraitLink, type PortraitNetwork, type PortraitNode } from "./buildNetwork";
import { NETWORK_REF_WIDTH, networkConfig } from "./networkConfig";
import styles from "./ParticlePortrait.module.scss";

type ParticlePortraitProps = {
  src: string;
  className?: string;
};

type CoverAnchorY = "top" | "center" | "bottom";

type Sim = {
  photoW: number;
  photoH: number;
  padL: number;
  padT: number;
  canvasW: number;
  canvasH: number;
  dpr: number;
  network: PortraitNetwork;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  pointData: Float32Array;
  lineData: Float32Array;
};

type GlBundle = {
  gl: WebGLRenderingContext;
  pointProgram: WebGLProgram;
  lineProgram: WebGLProgram;
  pointPos: number;
  pointColor: number;
  pointSize: number;
  linePos: number;
  lineColor: number;
  uPointResolution: WebGLUniformLocation | null;
  uPointDpr: WebGLUniformLocation | null;
  uPointMaxSize: WebGLUniformLocation | null;
  uLineResolution: WebGLUniformLocation | null;
  pointBuffer: WebGLBuffer;
  lineBuffer: WebGLBuffer;
  maxPointSize: number;
};

type Pulse = {
  nodes: number[];
  start: number;
};

const POINT_STRIDE = 28;
const LINE_STRIDE = 24;

const POINT_VS = `
attribute vec2 a_position;
attribute vec4 a_color;
attribute float a_pointSize;
uniform vec2 u_resolution;
uniform float u_dpr;
uniform float u_maxPointSize;
varying vec4 v_color;

void main() {
  float ndcX = a_position.x / u_resolution.x * 2.0 - 1.0;
  float ndcY = 1.0 - a_position.y / u_resolution.y * 2.0;
  gl_Position = vec4(ndcX, ndcY, 0.0, 1.0);
  gl_PointSize = clamp(max(a_pointSize * 2.0 * u_dpr, 1.0), 1.0, u_maxPointSize);
  v_color = a_color;
}
`;

const POINT_FS = `
precision mediump float;
varying vec4 v_color;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float edge = 1.0 - smoothstep(0.42, 0.5, d);
  if (edge < 0.01) discard;
  gl_FragColor = vec4(v_color.rgb, v_color.a * edge);
}
`;

const LINE_VS = `
attribute vec2 a_position;
attribute vec4 a_color;
uniform vec2 u_resolution;
varying vec4 v_color;

void main() {
  float ndcX = a_position.x / u_resolution.x * 2.0 - 1.0;
  float ndcY = 1.0 - a_position.y / u_resolution.y * 2.0;
  gl_Position = vec4(ndcX, ndcY, 0.0, 1.0);
  v_color = a_color;
}
`;

const LINE_FS = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`;

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dW: number,
  dH: number,
  anchorY: CoverAnchorY = "bottom",
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const scale = Math.max(dW / iw, dH / ih);
  const sw = dW / scale;
  const sh = dH / scale;
  const sx = Math.max(0, Math.min(iw - sw, (iw - sw) * 0.5));
  let sy = 0;
  if (anchorY === "center") sy = Math.max(0, (ih - sh) * 0.5);
  else if (anchorY === "bottom") sy = Math.max(0, ih - sh);
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dW, dH);
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[ParticlePortrait] shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("[ParticlePortrait] program:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function getWebGL1Context(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
  const opts: WebGLContextAttributes = {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
    powerPreference: "high-performance",
  };
  return (
    (canvas.getContext("webgl", opts) as WebGLRenderingContext | null) ??
    (canvas.getContext("experimental-webgl", opts) as WebGLRenderingContext | null)
  );
}

function coverAnchor(): CoverAnchorY {
  if (typeof window === "undefined") return "bottom";
  return window.matchMedia(`(max-width: ${networkConfig.mobileMaxWidth}px)`).matches
    ? "top"
    : "bottom";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function allowsPointer() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia(`(max-width: ${networkConfig.mobileMaxWidth}px)`).matches
  );
}

function densityForViewport() {
  return window.matchMedia(`(max-width: ${networkConfig.mobileMaxWidth}px)`).matches
    ? networkConfig.mobileDensity
    : 1;
}

function writeLineQuad(
  data: Float32Array,
  vertex: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  red: number,
  green: number,
  blue: number,
  alpha: number,
  width: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * (width * 0.5);
  const py = (dx / len) * (width * 0.5);
  const corners = [
    [x1 + px, y1 + py],
    [x1 - px, y1 - py],
    [x2 - px, y2 - py],
    [x1 + px, y1 + py],
    [x2 - px, y2 - py],
    [x2 + px, y2 + py],
  ];
  for (let i = 0; i < corners.length; i++) {
    const o = (vertex + i) * 6;
    data[o] = corners[i][0];
    data[o + 1] = corners[i][1];
    data[o + 2] = red;
    data[o + 3] = green;
    data[o + 4] = blue;
    data[o + 5] = alpha;
  }
}

function pickPulse(network: PortraitNetwork, now: number): Pulse | null {
  const { nodes, neighbors } = network;
  const starts: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if ((nodes[i].role === "mesh" || nodes[i].role === "node") && neighbors[i].length > 0) {
      starts.push(i);
    }
  }
  if (!starts.length) return null;
  let current = starts[Math.floor(Math.random() * starts.length)];
  const path = [current];
  const used = new Set([current]);
  for (let step = 0; step < networkConfig.pulseSteps; step++) {
    const next = neighbors[current].find((index) => !used.has(index));
    if (next == null) break;
    used.add(next);
    path.push(next);
    current = next;
  }
  if (path.length < 2) return null;
  return { nodes: path, start: now };
}

function linkPulseBoost(link: PortraitLink, pulse: Pulse | null, now: number) {
  if (!pulse) return 0;
  const ia = pulse.nodes.indexOf(link.a);
  const ib = pulse.nodes.indexOf(link.b);
  if (ia < 0 || ib < 0 || Math.abs(ia - ib) !== 1) return 0;
  const order = Math.min(ia, ib) / Math.max(1, pulse.nodes.length - 1);
  const u = (now - pulse.start) / networkConfig.pulseDurationMs;
  const hot = Math.exp(-((u - order) ** 2) / 0.018);
  return hot * networkConfig.pulseBoost;
}

export default function ParticlePortrait({ src, className }: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const simRef = useRef<Sim | null>(null);
  const glBundleRef = useRef<GlBundle | null>(null);
  const reducedRef = useRef(false);
  const pointerRef = useRef(false);
  const visibleRef = useRef(true);
  const pulseRef = useRef<Pulse | null>(null);
  const lastPulseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current ?? canvas?.parentElement;
    if (!canvas || !wrap) return;

    let disposed = false;
    const teardown: (() => void)[] = [];
    reducedRef.current = prefersReducedMotion();
    pointerRef.current = allowsPointer() && !reducedRef.current;

    const image = new Image();
    image.crossOrigin = "anonymous";

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    function releaseGl() {
      const bundle = glBundleRef.current;
      if (!bundle) return;
      const { gl, pointProgram, lineProgram, pointBuffer, lineBuffer } = bundle;
      gl.deleteBuffer(pointBuffer);
      gl.deleteBuffer(lineBuffer);
      gl.deleteProgram(pointProgram);
      gl.deleteProgram(lineProgram);
      glBundleRef.current = null;
    }

    function initGl(canvasEl: HTMLCanvasElement): GlBundle | null {
      const gl = getWebGL1Context(canvasEl);
      if (!gl) {
        console.error("[ParticlePortrait] WebGL unavailable");
        return null;
      }
      const pointProgram = createProgram(gl, POINT_VS, POINT_FS);
      const lineProgram = createProgram(gl, LINE_VS, LINE_FS);
      if (!pointProgram || !lineProgram) return null;

      const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array;
      const maxPointSize = Math.min(127, range[1] ?? 127);
      const pointBuffer = gl.createBuffer();
      const lineBuffer = gl.createBuffer();
      if (!pointBuffer || !lineBuffer) return null;

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);

      return {
        gl,
        pointProgram,
        lineProgram,
        pointPos: gl.getAttribLocation(pointProgram, "a_position"),
        pointColor: gl.getAttribLocation(pointProgram, "a_color"),
        pointSize: gl.getAttribLocation(pointProgram, "a_pointSize"),
        linePos: gl.getAttribLocation(lineProgram, "a_position"),
        lineColor: gl.getAttribLocation(lineProgram, "a_color"),
        uPointResolution: gl.getUniformLocation(pointProgram, "u_resolution"),
        uPointDpr: gl.getUniformLocation(pointProgram, "u_dpr"),
        uPointMaxSize: gl.getUniformLocation(pointProgram, "u_maxPointSize"),
        uLineResolution: gl.getUniformLocation(lineProgram, "u_resolution"),
        pointBuffer,
        lineBuffer,
        maxPointSize,
      };
    }

    function uploadAndDraw(bundle: GlBundle, sim: Sim) {
      const { gl } = bundle;
      const { network, canvasW, canvasH, dpr, padL, padT } = sim;
      const n = network.nodes.length;
      const reduced = reducedRef.current;
      const now = performance.now();
      const unit = sim.photoW / NETWORK_REF_WIDTH;

      if (!reduced && visibleRef.current) {
        const driftT = now * networkConfig.driftTimeScale;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const pointerRadius = networkConfig.pointerRadius * unit;
        const pointerInfluence = networkConfig.pointerInfluence * unit;
        const usePointer = pointerRef.current;

        for (let i = 0; i < n; i++) {
          const node = network.nodes[i];
          const amp =
            (node.role === "particle" ? networkConfig.driftAmplitude * 1.4 : networkConfig.driftAmplitude) *
            unit;
          let tx = node.x + amp * Math.sin(driftT + node.phase);
          let ty = node.y + amp * Math.cos(driftT * 1.13 + node.phase);
          if (node.role === "particle") {
            const creep = (0.5 + 0.5 * Math.sin(driftT * 0.65 + node.phase)) * networkConfig.particleDrift * unit;
            tx += node.outwardX * creep;
            ty += node.outwardY * creep;
          }
          let spring = networkConfig.spring;
          if (usePointer) {
            const pdx = mx - node.x;
            const pdy = my - node.y;
            const dist = Math.hypot(pdx, pdy);
            if (dist > 0.5 && dist < pointerRadius) {
              const falloff = (1 - dist / pointerRadius) ** 2;
              tx += (pdx / dist) * pointerInfluence * falloff;
              ty += (pdy / dist) * pointerInfluence * falloff;
              spring = networkConfig.pointerSpring;
            }
          }

          const nvx = (sim.vx[i] + (tx - sim.x[i]) * spring) * networkConfig.damp;
          const nvy = (sim.vy[i] + (ty - sim.y[i]) * spring) * networkConfig.damp;
          sim.vx[i] = nvx;
          sim.vy[i] = nvy;
          sim.x[i] += nvx;
          sim.y[i] += nvy;
        }

        if (!pulseRef.current && now - lastPulseRef.current > networkConfig.pulseIntervalMs) {
          pulseRef.current = pickPulse(network, now);
          if (!pulseRef.current) lastPulseRef.current = now;
        } else if (
          pulseRef.current &&
          now - pulseRef.current.start > networkConfig.pulseDurationMs
        ) {
          pulseRef.current = null;
          lastPulseRef.current = now;
        }
      }

      const pulse = reduced ? null : pulseRef.current;
      const hoverRadius = networkConfig.pointerRadius * unit;
      const pointerOn = pointerRef.current && !reduced;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hoverFalloff = (x: number, y: number) => {
        if (!pointerOn) return 0;
        const dist = Math.hypot(mx - x, my - y);
        if (dist >= hoverRadius) return 0;
        return (1 - dist / hoverRadius) ** 2;
      };

      for (let i = 0; i < n; i++) {
        const node = network.nodes[i];
        const hover = hoverFalloff(node.x, node.y);
        let alpha = node.alpha;
        if (pulse && pulse.nodes.includes(i)) {
          const order = pulse.nodes.indexOf(i) / Math.max(1, pulse.nodes.length - 1);
          const u = (now - pulse.start) / networkConfig.pulseDurationMs;
          alpha = Math.min(1, alpha + Math.exp(-((u - order) ** 2) / 0.02) * 0.28);
        }
        alpha = Math.min(1, alpha + hover * networkConfig.pointerBrighten);
        const o = i * 7;
        sim.pointData[o] = sim.x[i] + padL;
        sim.pointData[o + 1] = sim.y[i] + padT;
        sim.pointData[o + 2] = node.red;
        sim.pointData[o + 3] = node.green;
        sim.pointData[o + 4] = node.blue;
        sim.pointData[o + 5] = alpha;
        sim.pointData[o + 6] = node.radius * (1 + hover * networkConfig.pointerRadiusScale);
      }

      const lineWidth = networkConfig.lineWidth * (0.85 + 0.15 * Math.min(unit, 1.2));
      for (let i = 0; i < network.links.length; i++) {
        const link = network.links[i];
        const a = network.nodes[link.a];
        const b = network.nodes[link.b];
        const hover = Math.max(hoverFalloff(a.x, a.y), hoverFalloff(b.x, b.y));
        let alpha = link.alpha;
        if (!reduced && link.flickers) {
          const wave = 0.5 + 0.5 * Math.sin(now * networkConfig.linkFlickerSpeed + link.phase);
          alpha *= 0.18 + 0.82 * wave;
        }
        if (!reduced) alpha = Math.min(0.92, alpha + linkPulseBoost(link, pulse, now));
        alpha = Math.min(0.95, alpha + hover * networkConfig.pointerLineBoost);
        writeLineQuad(
          sim.lineData,
          i * 6,
          sim.x[link.a] + padL,
          sim.y[link.a] + padT,
          sim.x[link.b] + padL,
          sim.y[link.b] + padT,
          link.red,
          link.green,
          link.blue,
          alpha,
          lineWidth + hover * networkConfig.pointerLineWidth,
        );
      }

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (network.links.length > 0) {
        gl.useProgram(bundle.lineProgram);
        gl.uniform2f(bundle.uLineResolution, canvasW, canvasH);
        gl.bindBuffer(gl.ARRAY_BUFFER, bundle.lineBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sim.lineData, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(bundle.linePos);
        gl.vertexAttribPointer(bundle.linePos, 2, gl.FLOAT, false, LINE_STRIDE, 0);
        gl.enableVertexAttribArray(bundle.lineColor);
        gl.vertexAttribPointer(bundle.lineColor, 4, gl.FLOAT, false, LINE_STRIDE, 8);
        gl.drawArrays(gl.TRIANGLES, 0, network.links.length * 6);
      }

      if (n > 0) {
        gl.useProgram(bundle.pointProgram);
        gl.uniform2f(bundle.uPointResolution, canvasW, canvasH);
        gl.uniform1f(bundle.uPointDpr, dpr);
        gl.uniform1f(bundle.uPointMaxSize, bundle.maxPointSize);
        gl.bindBuffer(gl.ARRAY_BUFFER, bundle.pointBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sim.pointData, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(bundle.pointPos);
        gl.vertexAttribPointer(bundle.pointPos, 2, gl.FLOAT, false, POINT_STRIDE, 0);
        gl.enableVertexAttribArray(bundle.pointColor);
        gl.vertexAttribPointer(bundle.pointColor, 4, gl.FLOAT, false, POINT_STRIDE, 8);
        gl.enableVertexAttribArray(bundle.pointSize);
        gl.vertexAttribPointer(bundle.pointSize, 1, gl.FLOAT, false, POINT_STRIDE, 24);
        gl.drawArrays(gl.POINTS, 0, n);
      }
    }

    const drawFrame = () => {
      if (disposed) {
        stopLoop();
        return;
      }
      const sim = simRef.current;
      const bundle = glBundleRef.current;
      if (!sim || !bundle) return;
      uploadAndDraw(bundle, sim);
      if (disposed || reducedRef.current || !visibleRef.current) {
        stopLoop();
        return;
      }
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const kickLoop = () => {
      if (reducedRef.current || !visibleRef.current) {
        const sim = simRef.current;
        const bundle = glBundleRef.current;
        if (sim && bundle) uploadAndDraw(bundle, sim);
        return;
      }
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const layoutAndSeed = () => {
      if (disposed || !image.complete || !image.naturalWidth) return;
      const photoW = Math.floor(wrap.clientWidth);
      const photoH = Math.floor(wrap.clientHeight);
      if (photoW < 2 || photoH < 2) return;

      stopLoop();
      releaseGl();

      const padL = photoW * networkConfig.padLeft;
      const padR = photoW * networkConfig.padRight;
      const padT = photoH * networkConfig.padTop;
      const padB = photoH * networkConfig.padBottom;
      const canvasW = photoW + padL + padR;
      const canvasH = photoH + padT + padB;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(canvasW * dpr));
      canvas.height = Math.max(1, Math.floor(canvasH * dpr));
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;
      canvas.style.left = `${-padL}px`;
      canvas.style.top = `${-padT}px`;

      const offscreen = document.createElement("canvas");
      offscreen.width = photoW;
      offscreen.height = photoH;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      drawImageCover(offCtx, image, 0, 0, photoW, photoH, coverAnchor());
      const pixels = offCtx.getImageData(0, 0, photoW, photoH).data;
      const network = buildNetwork(pixels, photoW, photoH, densityForViewport());
      const count = network.nodes.length;

      const x = new Float32Array(count);
      const y = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        x[i] = network.nodes[i].x;
        y[i] = network.nodes[i].y;
      }

      simRef.current = {
        photoW,
        photoH,
        padL,
        padT,
        canvasW,
        canvasH,
        dpr,
        network,
        x,
        y,
        vx: new Float32Array(count),
        vy: new Float32Array(count),
        pointData: new Float32Array(count * 7),
        lineData: new Float32Array(Math.max(1, network.links.length) * 6 * 6),
      };

      const bundle = initGl(canvas);
      if (!bundle) return;
      glBundleRef.current = bundle;
      pulseRef.current = null;
      lastPulseRef.current = performance.now();
      kickLoop();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      stopLoop();
      releaseGl();
      simRef.current = null;
    };

    const onContextRestored = () => {
      if (!disposed) layoutAndSeed();
    };

    let started = false;
    const start = () => {
      if (started || disposed) return;
      started = true;
      canvas.addEventListener("webglcontextlost", onContextLost, false);
      canvas.addEventListener("webglcontextrestored", onContextRestored, false);
      teardown.push(() => {
        canvas.removeEventListener("webglcontextlost", onContextLost);
        canvas.removeEventListener("webglcontextrestored", onContextRestored);
      });

      const onVisibility = () => {
        if (disposed) return;
        if (document.hidden) stopLoop();
        else kickLoop();
      };
      document.addEventListener("visibilitychange", onVisibility);
      teardown.push(() => document.removeEventListener("visibilitychange", onVisibility));

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotion = () => {
        reducedRef.current = motionQuery.matches;
        pointerRef.current = allowsPointer() && !reducedRef.current;
        if (reducedRef.current) {
          pulseRef.current = null;
          const sim = simRef.current;
          if (sim) {
            for (let i = 0; i < sim.network.nodes.length; i++) {
              sim.x[i] = sim.network.nodes[i].x;
              sim.y[i] = sim.network.nodes[i].y;
              sim.vx[i] = 0;
              sim.vy[i] = 0;
            }
          }
        }
        mouseRef.current = { x: -9999, y: -9999 };
        kickLoop();
      };
      motionQuery.addEventListener("change", onMotion);
      teardown.push(() => motionQuery.removeEventListener("change", onMotion));

      const onMove = (event: MouseEvent) => {
        if (!pointerRef.current) return;
        const sim = simRef.current;
        if (!sim) return;
        const rect = canvas.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          mouseRef.current = { x: -9999, y: -9999 };
          return;
        }
        const scaleX = rect.width > 0 ? sim.canvasW / rect.width : 1;
        const scaleY = rect.height > 0 ? sim.canvasH / rect.height : 1;
        mouseRef.current = {
          x: (event.clientX - rect.left) * scaleX - sim.padL,
          y: (event.clientY - rect.top) * scaleY - sim.padT,
        };
      };
      window.addEventListener("mousemove", onMove);
      teardown.push(() => window.removeEventListener("mousemove", onMove));

      let layoutRaf = 0;
      const scheduleLayout = () => {
        if (layoutRaf) return;
        layoutRaf = requestAnimationFrame(() => {
          layoutRaf = 0;
          if (!disposed) layoutAndSeed();
        });
      };

      layoutAndSeed();
      window.addEventListener("resize", scheduleLayout);
      const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => scheduleLayout()) : null;
      ro?.observe(wrap);

      const io =
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(([entry]) => {
              visibleRef.current = entry.isIntersecting;
              if (!entry.isIntersecting) stopLoop();
              else kickLoop();
            })
          : null;
      io?.observe(wrap);

      teardown.push(() => {
        window.removeEventListener("resize", scheduleLayout);
        if (layoutRaf) cancelAnimationFrame(layoutRaf);
        ro?.disconnect();
        io?.disconnect();
        stopLoop();
        releaseGl();
        simRef.current = null;
      });
    };

    image.onload = start;
    image.src = src;
    if (image.complete && image.naturalWidth) start();

    return () => {
      disposed = true;
      image.onload = null;
      teardown.forEach((fn) => fn());
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={[styles.portrait, className].filter(Boolean).join(" ")}>
      <img src={src} alt="Portrait of Antonio Aranda Eggermont" className={styles.photo} draggable={false} />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
