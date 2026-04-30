import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session";
const PROJECT_SESSION_COOKIE_PREFIX = "project_session_started_";
const DEFAULT_ABSOLUTE_SESSION_TIMEOUT_SECONDS = 3 * 24 * 60 * 60;
const DEFAULT_SESSION_COOKIE_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

function getAbsoluteTimeoutSeconds(): number {
  const raw = process.env.ABSOLUTE_PROJECT_SESSION_TIMEOUT_SECONDS;
  if (raw === undefined || raw === "") return DEFAULT_ABSOLUTE_SESSION_TIMEOUT_SECONDS;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_ABSOLUTE_SESSION_TIMEOUT_SECONDS;
  return Math.floor(n);
}

export function getAbsoluteProjectSessionTimeoutSeconds() {
  return getAbsoluteTimeoutSeconds();
}

function getSessionCookieMaxAgeSeconds(): number {
  const raw = process.env.SESSION_COOKIE_MAX_AGE_SECONDS;
  if (raw === undefined || raw === "") return DEFAULT_SESSION_COOKIE_MAX_AGE_SECONDS;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_SESSION_COOKIE_MAX_AGE_SECONDS;
  return Math.floor(n);
}

function cookieNameForProject(projectKey: string) {
  return `${PROJECT_SESSION_COOKIE_PREFIX}${projectKey}`;
}

function parseEpochSeconds(value?: string): number | null {
  if (!value) return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.floor(n);
}

export function evaluateProjectSessionWindow(projectKey: string, startedAtRaw?: string) {
  const startedAtSeconds = parseEpochSeconds(startedAtRaw);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const timeoutSeconds = getAbsoluteTimeoutSeconds();

  if (!startedAtSeconds) {
    return { hardExpired: false, shouldSetStartCookie: true, nowSeconds };
  }

  const elapsedSeconds = nowSeconds - startedAtSeconds;
  const hardExpired = elapsedSeconds >= timeoutSeconds;

  return {
    hardExpired,
    shouldSetStartCookie: false,
    nowSeconds,
  };
}

export function isHardExpiredFromAuthTime(authTimeSeconds?: number | null) {
  if (!authTimeSeconds || !Number.isFinite(authTimeSeconds)) return false;
  const nowSeconds = Math.floor(Date.now() / 1000);
  const elapsedSeconds = nowSeconds - Math.floor(authTimeSeconds);
  return elapsedSeconds >= getAbsoluteTimeoutSeconds();
}

export function applyProjectSessionStartCookie(
  res: NextResponse,
  projectKey: string,
  startedAtSeconds: number,
) {
  // Keep the "started at" marker around at least as long as the main session cookie.
  // If this marker expires too early, the absolute timeout window can accidentally reset.
  const markerMaxAgeSeconds = Math.max(
    getAbsoluteTimeoutSeconds(),
    getSessionCookieMaxAgeSeconds(),
  );

  res.cookies.set({
    name: cookieNameForProject(projectKey),
    value: String(startedAtSeconds),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: markerMaxAgeSeconds,
  });
}

export function hardExpiredProjectSessionResponse(projectKey: string) {
  const res = NextResponse.json(
    { ok: false, reason: "session_hard_expired" },
    { status: 401 },
  );

  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  res.cookies.set({
    name: cookieNameForProject(projectKey),
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}

export function getProjectSessionCookieName(projectKey: string) {
  return cookieNameForProject(projectKey);
}
