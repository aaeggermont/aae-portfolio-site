import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

import { getAdmin } from "@/lib/firebase/admin";
import {
  applyAccessCodeSessionCookie,
  getAccessCodeSessionMaxAgeSeconds,
  hashAccessCode,
  hashAccessCodeLegacy,
  isValidAccessCodeFormat,
  normalizeAccessCodeInput,
  normalizeProjectKeys,
  PROJECT_ACCESS_CODES_COLLECTION,
  toExpiryUnixSeconds,
  type ProjectAccessCodeDoc,
} from "@/lib/auth/projectAccessCodeSession";
import { applyProjectSessionStartCookie } from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

type Body = {
  /** Project the reviewer is unlocking (must be in the code's projectKeys). */
  projectKey?: string;
  code?: string;
};

const redeemAttempts = new Map<string, { count: number; resetAt: number }>();
const REDEEM_WINDOW_MS = 15 * 60 * 1000;
const REDEEM_MAX_ATTEMPTS = 20;

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function allowRedeemAttempt(ip: string): boolean {
  const now = Date.now();
  const entry = redeemAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    redeemAttempts.set(ip, { count: 1, resetAt: now + REDEEM_WINDOW_MS });
    return true;
  }
  if (entry.count >= REDEEM_MAX_ATTEMPTS) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    if (!allowRedeemAttempt(clientIp(req))) {
      return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
    }

    const body = (await req.json()) as Body;
    const projectKey = (body.projectKey ?? "").trim();
    const code = normalizeAccessCodeInput(body.code ?? "");

    if (!projectKey || !code) {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    if (!isValidAccessCodeFormat(code)) {
      return NextResponse.json({ ok: false, reason: "invalid_code" }, { status: 400 });
    }

    const { db } = getAdmin();

    // Prefer v2 multi-project hash; fall back to legacy per-project hash.
    const v2Hash = hashAccessCode(code);
    let ref = db.collection(PROJECT_ACCESS_CODES_COLLECTION).doc(v2Hash);
    let snap = await ref.get();
    let codeHash = v2Hash;

    if (!snap.exists) {
      const legacyHash = hashAccessCodeLegacy(projectKey, code);
      ref = db.collection(PROJECT_ACCESS_CODES_COLLECTION).doc(legacyHash);
      snap = await ref.get();
      codeHash = legacyHash;
    }

    if (!snap.exists) {
      return NextResponse.json({ ok: false, reason: "invalid_code" }, { status: 403 });
    }

    const data = snap.data() as ProjectAccessCodeDoc;
    const projectKeys = normalizeProjectKeys(data);

    if (!projectKeys.includes(projectKey)) {
      return NextResponse.json({ ok: false, reason: "invalid_code" }, { status: 403 });
    }
    if (data.enabled === false) {
      return NextResponse.json({ ok: false, reason: "code_revoked" }, { status: 403 });
    }

    const expiresAtSeconds = toExpiryUnixSeconds(data.expiresAt);
    const nowSeconds = Math.floor(Date.now() / 1000);
    if (expiresAtSeconds != null && expiresAtSeconds <= nowSeconds) {
      return NextResponse.json({ ok: false, reason: "code_expired" }, { status: 403 });
    }

    const maxRedemptions = data.maxRedemptions;
    const redemptionCount = data.redemptionCount ?? 0;
    if (
      typeof maxRedemptions === "number" &&
      Number.isFinite(maxRedemptions) &&
      redemptionCount >= maxRedemptions
    ) {
      return NextResponse.json({ ok: false, reason: "code_exhausted" }, { status: 403 });
    }

    await ref.update({
      redemptionCount: FieldValue.increment(1),
      lastRedeemedAt: FieldValue.serverTimestamp(),
    });

    let sessionMaxAge = getAccessCodeSessionMaxAgeSeconds();
    if (expiresAtSeconds != null) {
      sessionMaxAge = Math.max(60, Math.min(sessionMaxAge, expiresAtSeconds - nowSeconds));
    }

    const res = NextResponse.json({
      ok: true,
      via: "access_code",
      label: data.reference ?? data.label ?? null,
      projectKeys,
    });

    applyAccessCodeSessionCookie(res, projectKeys, codeHash, sessionMaxAge);
    for (const key of projectKeys) {
      applyProjectSessionStartCookie(res, key, nowSeconds);
    }

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, reason: "redeem_failed", message },
      { status: 500 },
    );
  }
}
