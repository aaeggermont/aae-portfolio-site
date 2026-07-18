import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

import { getAdmin } from "@/lib/firebase/admin";
import { AdminAuthError, requireAdmin } from "@/lib/auth/requireAdmin";
import {
  accessCodeHint,
  DEFAULT_ACCESS_CODE_TTL_SECONDS,
  generateSixDigitAccessCode,
  hashAccessCode,
  PROJECT_ACCESS_CODES_COLLECTION,
} from "@/lib/auth/projectAccessCodeSession";

export const runtime = "nodejs";

type CreateBody = {
  /** @deprecated Prefer `projectKeys`. */
  projectKey?: string;
  projectKeys?: string[];
  projectId?: number;
  reference?: string;
  label?: string;
  days?: number;
  maxRedemptions?: number | null;
};

function uniqKeys(keys: string[]): string[] {
  return Array.from(new Set(keys.map((k) => k.trim()).filter(Boolean)));
}

export async function POST(req: Request) {
  try {
    const adminUser = await requireAdmin(req);
    const body = (await req.json()) as CreateBody;

    const reference = (body.reference ?? body.label ?? "").trim();
    const days =
      typeof body.days === "number" && Number.isFinite(body.days) && body.days > 0
        ? body.days
        : DEFAULT_ACCESS_CODE_TTL_SECONDS / (24 * 60 * 60);
    const maxRedemptions =
      typeof body.maxRedemptions === "number" && Number.isFinite(body.maxRedemptions)
        ? Math.floor(body.maxRedemptions)
        : null;

    const projectKeys = uniqKeys([
      ...(Array.isArray(body.projectKeys) ? body.projectKeys : []),
      ...(body.projectKey ? [body.projectKey] : []),
    ]);

    if (projectKeys.length === 0) {
      return NextResponse.json({ ok: false, reason: "missing_projectKeys" }, { status: 400 });
    }
    if (!reference) {
      return NextResponse.json({ ok: false, reason: "missing_reference" }, { status: 400 });
    }

    const { db } = getAdmin();
    const expiresAt = Timestamp.fromMillis(Date.now() + days * 24 * 60 * 60 * 1000);

    let code = generateSixDigitAccessCode();
    let codeHash = hashAccessCode(code);

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const ref = db.collection(PROJECT_ACCESS_CODES_COLLECTION).doc(codeHash);
      const existing = await ref.get();
      if (existing.exists) {
        code = generateSixDigitAccessCode();
        codeHash = hashAccessCode(code);
        continue;
      }

      await ref.set({
        projectKeys,
        // Keep primary projectKey for older list UIs / scripts
        projectKey: projectKeys[0],
        label: reference,
        reference,
        codeHash,
        codeHint: accessCodeHint(code),
        /** Plaintext for admin re-share; keep `project_access_codes` admin-read-only in rules. */
        accessCode: code,
        enabled: true,
        expiresAt,
        maxRedemptions,
        redemptionCount: 0,
        createdAt: FieldValue.serverTimestamp(),
        createdBy: adminUser.uid,
        lastRedeemedAt: null,
        revokedAt: null,
      });

      return NextResponse.json({
        ok: true,
        code,
        codeHash,
        codeHint: accessCodeHint(code),
        projectKeys,
        reference,
        expiresAt: expiresAt.toDate().toISOString(),
        days,
      });
    }

    return NextResponse.json(
      { ok: false, reason: "code_allocation_failed" },
      { status: 500 },
    );
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ ok: false, reason: error.reason }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, reason: "create_failed", message },
      { status: 500 },
    );
  }
}

type PatchBody = {
  codeHash?: string;
  enabled?: boolean;
};

/** Enable or revoke an access code. Revoke immediately ends live sessions (checked on each request). */
export async function PATCH(req: Request) {
  try {
    await requireAdmin(req);
    const body = (await req.json()) as PatchBody;
    const codeHash = (body.codeHash ?? "").trim();

    if (!codeHash || typeof body.enabled !== "boolean") {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    const { db } = getAdmin();
    const ref = db.collection(PROJECT_ACCESS_CODES_COLLECTION).doc(codeHash);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
    }

    await ref.update({
      enabled: body.enabled,
      updatedAt: FieldValue.serverTimestamp(),
      revokedAt: body.enabled ? null : FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      ok: true,
      codeHash,
      enabled: body.enabled,
      revoked: !body.enabled,
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ ok: false, reason: error.reason }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, reason: "update_failed", message },
      { status: 500 },
    );
  }
}
