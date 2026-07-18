import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

import {
  assertAccessCodeStillValid,
  clearAccessCodeSessionCookie,
  readAccessCodeSession,
} from "@/lib/auth/projectAccessCodeSession";
import {
  applyProjectSessionStartCookie,
  evaluateProjectSessionWindow,
  getProjectSessionCookieName,
  hardExpiredProjectSessionResponse,
  isHardExpiredFromAuthTime,
} from "@/lib/auth/projectSessionWindow";

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

export type ProjectMediaAuthSuccess = {
  ok: true;
  visibility: "public" | "restricted";
  via: "public" | "firebase" | "access_code";
  shouldSetStartCookie: boolean;
  startCookieAtSeconds: number;
};

export type ProjectMediaAuthFailure = {
  ok: false;
  status: number;
  reason: string;
  message?: string;
  hardExpiredResponse?: NextResponse;
};

/**
 * Authorizes media access for a project via:
 * 1) public visibility
 * 2) Firebase session/Bearer + allowlist
 * 3) redeemed access-code session (re-checked live against Firestore for revoke)
 */
export async function authorizeProjectMediaAccess(options: {
  auth: Auth;
  db: Firestore;
  projectKey: string;
  cookieStore: {
    get: (name: string) => { value: string } | undefined;
  };
  bearerToken?: string;
}): Promise<ProjectMediaAuthSuccess | ProjectMediaAuthFailure> {
  const { auth, db, projectKey, cookieStore, bearerToken } = options;

  const projSnap = await db.collection("projects_data").doc(projectKey).get();
  const visibility = (
    projSnap.exists ? (projSnap.data() as { visibility?: string })?.visibility : "restricted"
  ) as "public" | "restricted";

  if (visibility === "public") {
    return {
      ok: true,
      visibility,
      via: "public",
      shouldSetStartCookie: false,
      startCookieAtSeconds: Math.floor(Date.now() / 1000),
    };
  }

  const accessSession = readAccessCodeSession(projectKey, cookieStore);

  if (accessSession.ok) {
    const live = await assertAccessCodeStillValid({
      db,
      projectKey,
      codeHash: accessSession.codeHash,
    });

    if (!live.ok) {
      const res = NextResponse.json(
        { ok: false, reason: live.reason },
        { status: live.reason === "not_allowed" ? 403 : 401 },
      );
      clearAccessCodeSessionCookie(res, accessSession.projectKeys);
      return {
        ok: false,
        status: live.reason === "not_allowed" ? 403 : 401,
        reason: live.reason,
        hardExpiredResponse: res,
      };
    }

    const projectSessionState = evaluateProjectSessionWindow(
      projectKey,
      cookieStore.get(getProjectSessionCookieName(projectKey))?.value,
    );
    if (projectSessionState.hardExpired) {
      const res = hardExpiredProjectSessionResponse(projectKey);
      clearAccessCodeSessionCookie(res, live.projectKeys);
      return {
        ok: false,
        status: 401,
        reason: "session_hard_expired",
        hardExpiredResponse: res,
      };
    }

    return {
      ok: true,
      visibility,
      via: "access_code",
      shouldSetStartCookie: projectSessionState.shouldSetStartCookie,
      startCookieAtSeconds: projectSessionState.nowSeconds,
    };
  }

  let decoded: { uid: string; email?: string | null; auth_time?: number } | null = null;

  const session = cookieStore.get("session")?.value;
  if (session) {
    try {
      decoded = (await auth.verifySessionCookie(session, false)) as {
        uid: string;
        email?: string | null;
        auth_time?: number;
      };
    } catch {
      decoded = null;
    }
  }

  if (!decoded && bearerToken) {
    try {
      decoded = (await auth.verifyIdToken(bearerToken, false)) as {
        uid: string;
        email?: string | null;
        auth_time?: number;
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { ok: false, status: 401, reason: "bad_session", message };
    }
  }

  if (!decoded) {
    return { ok: false, status: 401, reason: "no_session" };
  }

  const email = normalizeEmail(decoded.email);
  const allowSnap = await db.collection("access_allowlist").doc(projectKey).get();
  const allow = (allowSnap.exists ? allowSnap.data() : {}) as {
    enabled?: boolean;
    allowedUids?: string[];
    allowedEmails?: string[];
  };

  const enabled = allow.enabled !== false;
  const uidOk = Array.isArray(allow.allowedUids) && allow.allowedUids.includes(decoded.uid);
  const emailOk =
    !!email &&
    Array.isArray(allow.allowedEmails) &&
    allow.allowedEmails.map(normalizeEmail).includes(email);

  if (!enabled || (!uidOk && !emailOk)) {
    return { ok: false, status: 403, reason: "not_allowed" };
  }

  if (isHardExpiredFromAuthTime(decoded.auth_time)) {
    return {
      ok: false,
      status: 401,
      reason: "session_hard_expired",
      hardExpiredResponse: hardExpiredProjectSessionResponse(projectKey),
    };
  }

  const projectSessionState = evaluateProjectSessionWindow(
    projectKey,
    cookieStore.get(getProjectSessionCookieName(projectKey))?.value,
  );
  if (projectSessionState.hardExpired) {
    return {
      ok: false,
      status: 401,
      reason: "session_hard_expired",
      hardExpiredResponse: hardExpiredProjectSessionResponse(projectKey),
    };
  }

  return {
    ok: true,
    visibility,
    via: "firebase",
    shouldSetStartCookie: projectSessionState.shouldSetStartCookie,
    startCookieAtSeconds: projectSessionState.nowSeconds,
  };
}

export function bearerTokenFromRequest(req: Request | NextRequest): string {
  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
  return authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
}

export function applyMediaAuthCookies(
  res: NextResponse,
  projectKey: string,
  authResult: ProjectMediaAuthSuccess,
) {
  if (authResult.shouldSetStartCookie) {
    applyProjectSessionStartCookie(res, projectKey, authResult.startCookieAtSeconds);
  }
}
