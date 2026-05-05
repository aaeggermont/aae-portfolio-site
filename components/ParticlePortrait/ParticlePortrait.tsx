"use client";

import { useEffect, useRef } from "react";

/**
 * Stippled portrait with scatter → spring-back (e.g. https://tishukov.com/).
 * WebGL1 point sprites: GPU draws many points; physics stays CPU. ~2× density (gap 4 vs 5).
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

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

/** Display-space Rec. 709 luma (fast; fine for stipple sampling). */
function luma709(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function contrastAroundPivot(L: number, pivot: number, strength: number): number {
  return clamp01(pivot + (L - pivot) * strength);
}

/**
 * Turn sampled photo RGB into stipple color + alpha + semantic darkness.
 * Contrast lift on luma + hue-preserving shadow scaling (not flat gray).
 */
function stippleToneFromPixel(r: number, g: number, b: number): {
  fr: number;
  fg: number;
  fb: number;
  ca: number;
  darkness: number;
} {
  let L = luma709(r, g, b);
  L = contrastAroundPivot(L, LUMA_CONTRAST_PIVOT, LUMA_CONTRAST_STRENGTH);
  L = clamp01(Math.pow(L, LUMA_TONE_GAMMA));
  const darkness = 1 - L;

  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const shadowCurve = Math.pow(darkness, SHADOW_DEPTH_EXP);
  const luminanceScale = 0.05 + 0.95 * (1 - shadowCurve * 0.95);

  let tr = rn * luminanceScale;
  let tg = gn * luminanceScale;
  let tb = bn * luminanceScale;

  const m = COLOR_MIX;
  tr = tr * m + 0.035 * (1 - m);
  tg = tg * m + 0.035 * (1 - m);
  tb = tb * m + 0.04 * (1 - m);

  const deep = darkness * darkness;
  const crush = deep * 0.36;
  tr *= 1 - crush * 0.14;
  tg *= 1 - crush * 0.16;
  tb *= 1 - crush * 0.07;

  /* Global darken — keeps hue from tone mapping */
  const punch = 1.78;
  tr *= punch;
  tg *= punch;
  tb *= punch;

  /* Higher base alpha so stipple holds weight next to large headline copy */
  const ca =
    0.18 +
    Math.min(0.94, darkness * 0.97 + (1 - darkness) * 0.09);

  return {
    fr: clamp01(tr),
    fg: clamp01(tg),
    fb: clamp01(tb),
    ca,
    darkness,
  };
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

/** Stronger spring / damping help dots hug their sampled pixels under alive motion (less smear). */
const SPRING = 0.29;
const DAMP = 0.88;
const MOUSE_R = 155;
const MOUSE_PUSH = 7.2;
/** Higher = more color straight from the photo (stands up vs hero chrome/text). */
const COLOR_MIX = 0.74;
/**
 * Perpetual micro-motion — keep amplitude small vs stipple gap so color samples stay aligned with marks.
 * (Large offsets read as softness because positions drift from the pixels colors were taken from.)
 */
const ALIVE_BASE_AMP = 1.05;
const ALIVE_TIME_SCALE = 0.00105;
const ALIVE_FREQ_X = 1.0;
const ALIVE_FREQ_Y = 1.19;
const ALIVE_BREATH_PERIOD_MS = 12800;
const TAU = Math.PI * 2;

/** Push mids/shadows away from pivot so the stipple reads less flat (photo-driven). */
const LUMA_CONTRAST_PIVOT = 0.36;
const LUMA_CONTRAST_STRENGTH = 2.02;
/** >1 deepens mids/shadows after contrast (stronger separation vs page background). */
const LUMA_TONE_GAMMA = 1.16;
/** How aggressively darker regions pull RGB toward deep shades (hue preserved). */
const SHADOW_DEPTH_EXP = 0.68;

/** Grid step (px); smaller = finer stipple / smaller marks (density ∝ 1/gap²). */
const SAMPLE_GAP = 2;
/** Slightly fewer random drops so edges/high-frequency detail keep coverage. */
const SKIP_THRESHOLD = 0.97;

/** Stride: rgba (4) + pointSize + shapeKind + rotation + homeYNorm = 8 floats */
const STATIC_STRIDE = 32;

/** First-load sweep (top → bottom); shader uses normalized rest Y per particle */
const REVEAL_DURATION_MS = 3150;
/** Sweep line in normalized home Y [0 = top, 1 = bottom]; must stay within ~[-band, 1+band] for smooth edges */
const REVEAL_FROM = 0;
const REVEAL_TO = 1.12;

const VS = `
attribute vec2 a_position;
attribute vec4 a_color;
attribute float a_pointSize;
attribute float a_shapeKind;
attribute float a_rotation;
attribute float a_homeYNorm;
uniform vec2 u_resolution;
uniform float u_dpr;
uniform float u_maxPointSize;
varying vec4 v_color;
varying float v_shapeKind;
varying float v_rotation;
varying float v_homeYNorm;

void main() {
  float ndcX = a_position.x / u_resolution.x * 2.0 - 1.0;
  float ndcY = 1.0 - a_position.y / u_resolution.y * 2.0;
  gl_Position = vec4(ndcX, ndcY, 0.0, 1.0);
  float ps = a_pointSize * 2.0 * u_dpr;
  gl_PointSize = clamp(max(ps, 1.0), 1.0, u_maxPointSize);
  v_color = a_color;
  v_shapeKind = a_shapeKind;
  v_rotation = a_rotation;
  v_homeYNorm = a_homeYNorm;
}
`;

const FS = `
precision mediump float;
varying vec4 v_color;
varying float v_shapeKind;
varying float v_rotation;
varying float v_homeYNorm;
uniform float u_reveal;
uniform float u_revealActive;

float sdfCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdfHex(vec2 p, float r) {
  vec2 q = abs(p);
  return max(q.x * 0.8660254 + q.y * 0.5, q.y) - r;
}

float sdfDiamond(vec2 p, float r) {
  return abs(p.x) + abs(p.y) - r;
}

float sdfSquircle(vec2 p, float r) {
  vec2 q = abs(p);
  float rr = pow(r, 2.35);
  return pow(q.x, 2.35) + pow(q.y, 2.35) - rr;
}

void main() {
  vec2 uv = gl_PointCoord.xy - 0.5;
  float c = cos(v_rotation);
  float s = sin(v_rotation);
  vec2 p = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

  float d;
  if (v_shapeKind < 0.5) {
    d = sdfCircle(p, 0.46);
  } else if (v_shapeKind < 1.5) {
    d = sdfHex(p, 0.41);
  } else if (v_shapeKind < 2.5) {
    d = sdfDiamond(p, 0.52);
  } else {
    d = sdfSquircle(p, 0.42);
  }

  /* Slightly wider AA band so tiles read a touch more merged / organic */
  float edge = 1.0 - smoothstep(-0.052, 0.052, d);
  if (edge < 0.004) discard;

  vec3 col = v_color.rgb;
  float len = length(p);

  /* Stronger chroma vs gray — matches higher COLOR_MIX on CPU */
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, 1.24);
  col = clamp(col, 0.0, 1.0);

  /* Narrow highlight range — preserves modeling but stays darker on average */
  float light = 0.67 + 0.11 * clamp(-p.y * 1.05 - p.x * 0.42 + 0.18, 0.0, 1.0);
  col *= light;

  float dome = 1.0 - smoothstep(0.0, 0.44, len);
  col *= 0.75 + 0.11 * dome;

  float rim = exp(-(d * d) / 0.00055);
  col *= 1.0 - rim * 0.15;

  float alpha = v_color.a * edge;
  if (u_revealActive > 0.5) {
    float revealBand = 0.09;
    float sw = smoothstep(u_reveal - revealBand, u_reveal + revealBand, v_homeYNorm);
    alpha *= (1.0 - sw);
  }

  gl_FragColor = vec4(col, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("[ParticlePortrait] shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function createPointProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VS);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("[ParticlePortrait] program:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

type Sim = {
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
  posUpload: Float32Array;
  staticInterleaved: Float32Array;
  /** Per-particle phase & weight for `ALIVE_*` motion (radians / 0..1). */
  phaseAx: Float32Array;
  phaseAy: Float32Array;
  aliveWeight: Float32Array;
};

type GlBundle = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  aPosition: number;
  aColor: number;
  aPointSize: number;
  aShapeKind: number;
  aRotation: number;
  aHomeYNorm: number;
  uResolution: WebGLUniformLocation | null;
  uDpr: WebGLUniformLocation | null;
  uMaxPointSize: WebGLUniformLocation | null;
  uReveal: WebGLUniformLocation | null;
  uRevealActive: WebGLUniformLocation | null;
  bufPos: WebGLBuffer;
  bufStatic: WebGLBuffer;
  maxPointSize: number;
};

function getWebGL1Context(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
  const opts: WebGLContextAttributes = {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    powerPreference: "high-performance",
  };
  return (
    (canvas.getContext("webgl", opts) as WebGLRenderingContext | null) ??
    (canvas.getContext("experimental-webgl", opts) as WebGLRenderingContext | null)
  );
}

export default function ParticlePortrait({ src, className }: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const simRef = useRef<Sim | null>(null);
  const glBundleRef = useRef<GlBundle | null>(null);
  const introRevealDoneRef = useRef(false);
  const revealStartMsRef = useRef<number | null>(null);
  const prevLayoutDimsRef = useRef<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current ?? canvas?.parentElement;
    if (!canvas || !wrap) return;

    prevLayoutDimsRef.current = null;
    introRevealDoneRef.current = false;
    revealStartMsRef.current = null;

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

    function releaseGl() {
      const b = glBundleRef.current;
      if (!b) return;
      const { gl, program, bufPos, bufStatic } = b;
      gl.deleteBuffer(bufPos);
      gl.deleteBuffer(bufStatic);
      gl.deleteProgram(program);
      glBundleRef.current = null;
    }

    function initGl(canvasEl: HTMLCanvasElement): GlBundle | null {
      const gl = getWebGL1Context(canvasEl);
      if (!gl) {
        console.error("[ParticlePortrait] WebGL unavailable");
        return null;
      }
      const program = createPointProgram(gl);
      if (!program) return null;

      const aPosition = gl.getAttribLocation(program, "a_position");
      const aColor = gl.getAttribLocation(program, "a_color");
      const aPointSize = gl.getAttribLocation(program, "a_pointSize");
      const aShapeKind = gl.getAttribLocation(program, "a_shapeKind");
      const aRotation = gl.getAttribLocation(program, "a_rotation");
      const aHomeYNorm = gl.getAttribLocation(program, "a_homeYNorm");
      const uResolution = gl.getUniformLocation(program, "u_resolution");
      const uDpr = gl.getUniformLocation(program, "u_dpr");
      const uMaxPointSize = gl.getUniformLocation(program, "u_maxPointSize");
      const uReveal = gl.getUniformLocation(program, "u_reveal");
      const uRevealActive = gl.getUniformLocation(program, "u_revealActive");

      const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array;
      const maxPointSize = Math.min(127, range[1] ?? 127);

      const bufPos = gl.createBuffer()!;
      const bufStatic = gl.createBuffer()!;

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);

      return {
        gl,
        program,
        aPosition,
        aColor,
        aPointSize,
        aShapeKind,
        aRotation,
        aHomeYNorm,
        uResolution,
        uDpr,
        uMaxPointSize,
        uReveal,
        uRevealActive,
        bufPos,
        bufStatic,
        maxPointSize,
      };
    }

    function bindAttribsAndDraw(b: GlBundle, sim: Sim) {
      const {
        gl,
        program,
        aPosition,
        aColor,
        aPointSize,
        aShapeKind,
        aRotation,
        aHomeYNorm,
        uResolution,
        uDpr,
        uMaxPointSize,
        uReveal,
        uRevealActive,
        bufPos,
        bufStatic,
      } = b;
      const { w, h, dpr, n } = sim;

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(uResolution, w, h);
      gl.uniform1f(uDpr, dpr);
      gl.uniform1f(uMaxPointSize, b.maxPointSize);

      let reveal = REVEAL_TO;
      let revealActive = 0;
      if (!introRevealDoneRef.current && revealStartMsRef.current != null && uReveal && uRevealActive) {
        revealActive = 1;
        const elapsed = performance.now() - revealStartMsRef.current;
        const t = Math.min(1, elapsed / REVEAL_DURATION_MS);
        const ease = 1 - (1 - t) ** 3;
        reveal = REVEAL_FROM + (REVEAL_TO - REVEAL_FROM) * ease;
        if (t >= 1) {
          introRevealDoneRef.current = true;
          revealActive = 0;
        }
      }
      gl.uniform1f(uReveal, reveal);
      gl.uniform1f(uRevealActive, revealActive);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufStatic);
      gl.enableVertexAttribArray(aColor);
      gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, STATIC_STRIDE, 0);
      gl.enableVertexAttribArray(aPointSize);
      gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, STATIC_STRIDE, 16);
      gl.enableVertexAttribArray(aShapeKind);
      gl.vertexAttribPointer(aShapeKind, 1, gl.FLOAT, false, STATIC_STRIDE, 20);
      gl.enableVertexAttribArray(aRotation);
      gl.vertexAttribPointer(aRotation, 1, gl.FLOAT, false, STATIC_STRIDE, 24);
      gl.enableVertexAttribArray(aHomeYNorm);
      gl.vertexAttribPointer(aHomeYNorm, 1, gl.FLOAT, false, STATIC_STRIDE, 28);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, n);
    }

    function uploadBuffersOnce(b: GlBundle, sim: Sim) {
      const { gl, bufPos, bufStatic } = b;
      gl.bindBuffer(gl.ARRAY_BUFFER, bufStatic);
      gl.bufferData(gl.ARRAY_BUFFER, sim.staticInterleaved, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
      gl.bufferData(gl.ARRAY_BUFFER, sim.posUpload, gl.DYNAMIC_DRAW);
    }

    function uploadPositionsOnly(b: GlBundle, sim: Sim) {
      const { gl, bufPos } = b;
      gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, sim.posUpload);
    }

    const buildSim = (w: number, h: number, dpr: number, pixels: Uint8ClampedArray) => {
      const gap = SAMPLE_GAP;
      const jitter = gap * 0.15;

      const hxList: number[] = [];
      const hyList: number[] = [];
      const radList: number[] = [];
      const crList: number[] = [];
      const cgList: number[] = [];
      const cbList: number[] = [];
      const caList: number[] = [];
      const shapeKindList: number[] = [];
      const rotationList: number[] = [];
      const phaseAxList: number[] = [];
      const phaseAyList: number[] = [];
      const aliveWeightList: number[] = [];

      let gy = 0;
      for (let y = 0; y < h; y += gap, gy++) {
        let gx = 0;
        for (let x = 0; x < w; x += gap, gx++) {
          if (cellHash(gx, gy) > SKIP_THRESHOLD) continue;

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

          const tone = stippleToneFromPixel(r, g, b);
          const { fr, fg, fb, ca, darkness } = tone;
          if (darkness < 0.048) continue;

          const breathe = 0.93 + cellHash(gx + 31, gy + 7) * 0.12;
          /* Smaller gl_PointSize → more facial detail; caps stay within typical GPU point limits */
          const rad = Math.min(
            0.92,
            Math.max(0.18, (0.07 + darkness * darkness * 1.68) * breathe),
          );

          const hShape = cellHash(gx + 101, gy + 47);
          const shapeKind = hShape < 0.26 ? 0 : hShape < 0.52 ? 1 : hShape < 0.76 ? 2 : 3;
          const rotation = cellHash(gx + 3, gy + 88) * Math.PI * 2;

          hxList.push(px);
          hyList.push(py);
          radList.push(rad);
          crList.push(fr);
          cgList.push(fg);
          cbList.push(fb);
          caList.push(ca);
          shapeKindList.push(shapeKind);
          rotationList.push(rotation);
          phaseAxList.push(cellHash(gx + 11, gy + 22) * TAU);
          phaseAyList.push(cellHash(gx + 79, gy + 41) * TAU);
          aliveWeightList.push(0.62 + cellHash(gx + 3, gy + 99) * 0.38);
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
      const invH = h > 1 ? 1 / (h - 1) : 1;
      const staticInterleaved = new Float32Array(n * 8);
      const posUpload = new Float32Array(n * 2);
      const phaseAx = new Float32Array(n);
      const phaseAy = new Float32Array(n);
      const aliveWeight = new Float32Array(n);

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
        phaseAx[i] = phaseAxList[i];
        phaseAy[i] = phaseAyList[i];
        aliveWeight[i] = aliveWeightList[i];
        const homeYNorm = hy[i] * invH;
        const o = i * 8;
        staticInterleaved[o] = cr[i];
        staticInterleaved[o + 1] = cg[i];
        staticInterleaved[o + 2] = cb[i];
        staticInterleaved[o + 3] = ca[i];
        staticInterleaved[o + 4] = rad[i];
        staticInterleaved[o + 5] = shapeKindList[i];
        staticInterleaved[o + 6] = rotationList[i];
        staticInterleaved[o + 7] = homeYNorm;
        posUpload[i * 2] = x[i];
        posUpload[i * 2 + 1] = y[i];
      }

      simRef.current = {
        w,
        h,
        dpr,
        n,
        hx,
        hy,
        x,
        y,
        vx,
        vy,
        rad,
        cr,
        cg,
        cb,
        ca,
        posUpload,
        staticInterleaved,
        phaseAx,
        phaseAy,
        aliveWeight,
      };
    };

    const drawFrame = () => {
      if (disposed) {
        stopLoop();
        return;
      }
      const sim = simRef.current;
      const b = glBundleRef.current;
      if (!sim || !b || !canvas) return;

      const { n, hx, hy, x, y, vx, vy, posUpload, phaseAx, phaseAy, aliveWeight } = sim;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const nowMs = performance.now();
      const t = nowMs * ALIVE_TIME_SCALE;
      const breath =
        0.96 + 0.04 * Math.sin((nowMs / ALIVE_BREATH_PERIOD_MS) * TAU);

      for (let i = 0; i < n; i++) {
        const amp = ALIVE_BASE_AMP * aliveWeight[i] * breath;
        const ox = amp * Math.sin(ALIVE_FREQ_X * t + phaseAx[i]);
        const oy = amp * Math.cos(ALIVE_FREQ_Y * t + phaseAy[i]);
        let fx = (hx[i] + ox - x[i]) * SPRING;
        let fy = (hy[i] + oy - y[i]) * SPRING;

        const dx = x[i] - mx;
        const dy = y[i] - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.5 && dist < MOUSE_R) {
          const falloff = 1 - dist / MOUSE_R;
          const push = MOUSE_PUSH * falloff * falloff;
          fx += (dx / dist) * push;
          fy += (dy / dist) * push;
        }

        const nvx = (vx[i] + fx) * DAMP;
        const nvy = (vy[i] + fy) * DAMP;
        vx[i] = nvx;
        vy[i] = nvy;
        x[i] += nvx;
        y[i] += nvy;

        posUpload[i * 2] = x[i];
        posUpload[i * 2 + 1] = y[i];
      }

      uploadPositionsOnly(b, sim);
      bindAttribsAndDraw(b, sim);

      if (disposed) return;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const kickLoop = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const layoutAndSeed = () => {
      if (disposed) return;
      const w = Math.max(1, Math.floor(wrap.clientWidth));
      const h = Math.max(1, Math.floor(wrap.clientHeight));
      const dpr = window.devicePixelRatio || 1;

      const prev = prevLayoutDimsRef.current;
      if (prev && (prev.w !== w || prev.h !== h)) {
        introRevealDoneRef.current = true;
      }
      prevLayoutDimsRef.current = { w, h };

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
      releaseGl();

      const bundle = initGl(canvas);
      if (!bundle) return;
      glBundleRef.current = bundle;

      buildSim(w, h, dpr, pixels);
      const sim = simRef.current;
      if (!sim) return;
      if (!introRevealDoneRef.current) {
        revealStartMsRef.current = performance.now();
      }
      uploadBuffersOnce(bundle, sim);
      bindAttribsAndDraw(bundle, sim);
      if (typeof document === "undefined" || !document.hidden) {
        kickLoop();
      }
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      releaseGl();
      simRef.current = null;
    };

    const onContextRestored = () => {
      if (disposed) return;
      layoutAndSeed();
    };

    image.onload = () => {
      if (disposed) return;
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
        releaseGl();
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
