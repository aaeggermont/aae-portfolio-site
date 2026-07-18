import { createHash, createHmac, randomInt, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import type { Firestore } from "firebase-admin/firestore";

export const PROJECT_ACCESS_CODES_COLLECTION = "project_access_codes";
/** Single cookie granting access to one or more projects. */
export const PORTFOLIO_ACCESS_COOKIE = "portfolio_access";

/** Default reviewer session after redeeming a code: 7 days. */
const DEFAULT_ACCESS_CODE_SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

/** Default code validity when creating: 30 days. */
export const DEFAULT_ACCESS_CODE_TTL_SECONDS = 30 * 24 * 60 * 60;

export type ProjectAccessCodeDoc = {
  /** @deprecated Prefer `projectKeys` — kept for legacy single-project docs. */
  projectKey?: string;
  projectKeys?: string[];
  projectId?: number;
  label: string;
  reference?: string;
  /** SHA-256 hex of peppered code — also used as document id. */
  codeHash: string;
  /** Hint for admin display (e.g. "••••91"). */
  codeHint: string;
  /**
   * Plaintext 6-digit code for admin re-share.
   * Only safe if Firestore rules restrict `project_access_codes` to admins.
   */
  accessCode?: string;
  enabled: boolean;
  expiresAt: unknown | null;
  maxRedemptions: number | null;
  redemptionCount: number;
  createdAt?: unknown;
  createdBy?: string;
  lastRedeemedAt?: unknown | null;
  revokedAt?: unknown | null;
};

type AccessCodeCookiePayloadV2 = {
  v: 2;
  projectKeys: string[];
  codeHash: string;
  exp: number; // unix seconds
};

/** Legacy per-project cookie (still accepted until expiry). */
type AccessCodeCookiePayloadV1 = {
  v: 1;
  projectKey: string;
  codeHash: string;
  exp: number;
};

type AccessCodeCookiePayload = AccessCodeCookiePayloadV1 | AccessCodeCookiePayloadV2;

function getPepper(): string {
  if (process.env.PROJECT_ACCESS_CODE_SECRET) {
    return process.env.PROJECT_ACCESS_CODE_SECRET;
  }
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    "local";
  return `aae-access-code:${projectId}`;
}

export function getAccessCodeSessionMaxAgeSeconds(): number {
  const raw = process.env.ACCESS_CODE_SESSION_MAX_AGE_SECONDS;
  if (raw === undefined || raw === "") return DEFAULT_ACCESS_CODE_SESSION_MAX_AGE_SECONDS;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_ACCESS_CODE_SESSION_MAX_AGE_SECONDS;
  return Math.floor(n);
}

/** @deprecated Use PORTFOLIO_ACCESS_COOKIE — kept for clearing legacy cookies. */
export function accessCodeCookieName(projectKey: string) {
  return `project_access_${projectKey}`;
}

/**
 * Hash for multi-project codes (v2).
 * Legacy single-project hashes used `pepper:projectKey:code`.
 */
export function hashAccessCode(code: string): string {
  const normalized = normalizeAccessCodeInput(code);
  return createHash("sha256")
    .update(`${getPepper()}:v2:${normalized}`)
    .digest("hex");
}

/** Legacy hash used by earlier single-project codes. */
export function hashAccessCodeLegacy(projectKey: string, code: string): string {
  const normalized = normalizeAccessCodeInput(code);
  return createHash("sha256")
    .update(`${getPepper()}:${projectKey}:${normalized}`)
    .digest("hex");
}

export function normalizeAccessCodeInput(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 6);
}

export function isValidAccessCodeFormat(code: string): boolean {
  return /^\d{6}$/.test(code);
}

export function generateSixDigitAccessCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function accessCodeHint(code: string): string {
  const digits = normalizeAccessCodeInput(code);
  if (digits.length < 2) return "••••••";
  return `••••${digits.slice(-2)}`;
}

export function normalizeProjectKeys(
  doc: Pick<ProjectAccessCodeDoc, "projectKey" | "projectKeys">,
): string[] {
  if (Array.isArray(doc.projectKeys) && doc.projectKeys.length > 0) {
    return Array.from(
      new Set(doc.projectKeys.map((k) => String(k).trim()).filter(Boolean)),
    );
  }
  if (doc.projectKey) return [String(doc.projectKey).trim()].filter(Boolean);
  return [];
}

function signPayload(payload: AccessCodeCookiePayload): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", getPepper()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifySignedPayload(token: string): AccessCodeCookiePayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  if (!body || !sig) return null;

  const expected = createHmac("sha256", getPepper()).update(body).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as AccessCodeCookiePayload;

    if (parsed?.v === 2) {
      if (
        !Array.isArray(parsed.projectKeys) ||
        parsed.projectKeys.length === 0 ||
        !parsed.codeHash ||
        !parsed.exp
      ) {
        return null;
      }
      return parsed;
    }

    if (parsed?.v === 1) {
      if (!parsed.projectKey || !parsed.codeHash || !parsed.exp) return null;
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export function readPortfolioAccessCookie(cookieValue?: string): {
  ok: true;
  codeHash: string;
  projectKeys: string[];
  exp: number;
} | { ok: false } {
  if (!cookieValue) return { ok: false };
  const payload = verifySignedPayload(cookieValue);
  if (!payload) return { ok: false };

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) return { ok: false };

  if (payload.v === 2) {
    return {
      ok: true,
      codeHash: payload.codeHash,
      projectKeys: payload.projectKeys,
      exp: payload.exp,
    };
  }

  return {
    ok: true,
    codeHash: payload.codeHash,
    projectKeys: [payload.projectKey],
    exp: payload.exp,
  };
}

/**
 * Resolve an access-code session for a specific project from the portfolio cookie
 * (v2) or a legacy per-project cookie (v1).
 */
export function readAccessCodeSession(
  projectKey: string,
  cookieStore: { get: (name: string) => { value: string } | undefined },
): { ok: true; codeHash: string; exp: number; projectKeys: string[] } | { ok: false } {
  const portfolio = readPortfolioAccessCookie(
    cookieStore.get(PORTFOLIO_ACCESS_COOKIE)?.value,
  );
  if (portfolio.ok && portfolio.projectKeys.includes(projectKey)) {
    return portfolio;
  }

  // Legacy per-project cookie
  const legacy = readPortfolioAccessCookie(
    cookieStore.get(accessCodeCookieName(projectKey))?.value,
  );
  if (legacy.ok && legacy.projectKeys.includes(projectKey)) {
    return legacy;
  }

  return { ok: false };
}

/**
 * Live revoke check: cookie alone is not enough — code must still be enabled
 * in Firestore and include this project.
 */
export async function assertAccessCodeStillValid(options: {
  db: Firestore;
  projectKey: string;
  codeHash: string;
}): Promise<{ ok: true; projectKeys: string[] } | { ok: false; reason: string }> {
  const { db, projectKey, codeHash } = options;
  const snap = await db.collection(PROJECT_ACCESS_CODES_COLLECTION).doc(codeHash).get();
  if (!snap.exists) {
    return { ok: false, reason: "code_revoked" };
  }

  const data = snap.data() as ProjectAccessCodeDoc;
  if (data.enabled === false) {
    return { ok: false, reason: "code_revoked" };
  }

  const projectKeys = normalizeProjectKeys(data);
  if (!projectKeys.includes(projectKey)) {
    return { ok: false, reason: "not_allowed" };
  }

  const expiresAtSeconds = toExpiryUnixSeconds(data.expiresAt);
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (expiresAtSeconds != null && expiresAtSeconds <= nowSeconds) {
    return { ok: false, reason: "code_expired" };
  }

  return { ok: true, projectKeys };
}

export function applyAccessCodeSessionCookie(
  res: NextResponse,
  projectKeys: string[],
  codeHash: string,
  maxAgeSeconds: number,
) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + maxAgeSeconds;
  const keys = Array.from(new Set(projectKeys.map((k) => k.trim()).filter(Boolean)));
  const token = signPayload({
    v: 2,
    projectKeys: keys,
    codeHash,
    exp,
  });

  res.cookies.set({
    name: PORTFOLIO_ACCESS_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export function clearAccessCodeSessionCookie(
  res: NextResponse,
  projectKeys: string[] = [],
) {
  res.cookies.set({
    name: PORTFOLIO_ACCESS_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  for (const projectKey of projectKeys) {
    res.cookies.set({
      name: accessCodeCookieName(projectKey),
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
}

export function toExpiryUnixSeconds(expiresAt: unknown): number | null {
  if (!expiresAt) return null;
  if (expiresAt instanceof Date) return Math.floor(expiresAt.getTime() / 1000);
  if (
    typeof expiresAt === "object" &&
    expiresAt !== null &&
    typeof (expiresAt as { toDate?: () => Date }).toDate === "function"
  ) {
    return Math.floor((expiresAt as { toDate: () => Date }).toDate().getTime() / 1000);
  }
  const seconds =
    typeof expiresAt === "object" && expiresAt !== null
      ? ((expiresAt as { seconds?: number }).seconds ??
        (expiresAt as { _seconds?: number })._seconds)
      : undefined;
  if (typeof seconds === "number" && Number.isFinite(seconds)) return Math.floor(seconds);
  return null;
}
