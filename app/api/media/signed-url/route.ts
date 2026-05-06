import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdmin } from "@/lib/firebase/admin";
import {
  applyProjectSessionStartCookie,
  evaluateProjectSessionWindow,
  getProjectSessionCookieName,
  hardExpiredProjectSessionResponse,
  isHardExpiredFromAuthTime,
} from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

type Body = {
  projectKey: string;  // "project_4"
  objectPath: string;  // "projects/project_4/GenericTaskFlow.png"
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

function buildProxyUrl(req: Request, projectKey: string, objectPath: string) {
  const url = new URL("/api/media/proxy", req.url);
  url.searchParams.set("projectKey", projectKey);
  url.searchParams.set("objectPath", objectPath);
  return url.toString();
}

export async function POST(req: Request) {
  try {
    const { auth, db, bucket } = getAdmin();
    const cookieStore = await cookies();

    const { projectKey, objectPath } = (await req.json()) as Body;

    if (!projectKey || !objectPath) {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    // basic safety: ensure callers can’t request arbitrary files
    if (objectPath.includes("..") || !objectPath.startsWith(`projects/${projectKey}/`)) {
      return NextResponse.json({ ok: false, reason: "invalid_path" }, { status: 400 });
    }

    // verify session cookie; fallback to Bearer ID token when cookie is unavailable
    const session = cookieStore.get("session")?.value;
    let decoded: { uid: string; email?: string | null } | null = null;

    if (session) {
      try {
        decoded = (await auth.verifySessionCookie(session, false)) as {
          uid: string;
          email?: string | null;
        };
      } catch {
        decoded = null;
      }
    }

    if (!decoded) {
      const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
      const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.slice("Bearer ".length).trim()
        : "";

      if (!bearerToken) {
        return NextResponse.json({ ok: false, reason: "no_session" }, { status: 401 });
      }

      try {
        decoded = (await auth.verifyIdToken(bearerToken, false)) as {
          uid: string;
          email?: string | null;
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ ok: false, reason: "bad_session", message }, { status: 401 });
      }
    }

    const uid = decoded.uid;

    // read visibility from your existing projects_data
    // IMPORTANT: this assumes doc id is "project_4"
    const projSnap = await db.collection("projects_data").doc(projectKey).get();
    const visibility = (projSnap.exists ? (projSnap.data() as any)?.visibility : "restricted") as
      | "public"
      | "restricted";

    // if restricted, verify allowlist
    if (visibility !== "public") {
      const email = normalizeEmail(decoded.email);

      const allowSnap = await db.collection("access_allowlist").doc(projectKey).get();
      const allow = (allowSnap.exists ? allowSnap.data() : {}) as any;

      const enabled = allow?.enabled !== false;
      const uidOk = Array.isArray(allow?.allowedUids) && allow.allowedUids.includes(uid);
      const emailOk =
        !!email &&
        Array.isArray(allow?.allowedEmails) &&
        allow.allowedEmails.map(normalizeEmail).includes(email);

      if (!enabled || (!uidOk && !emailOk)) {
        return NextResponse.json({ ok: false, reason: "not_allowed" }, { status: 403 });
      }

      // Strong absolute timeout check based on Firebase auth_time.
      if (isHardExpiredFromAuthTime((decoded as { auth_time?: number }).auth_time)) {
        return hardExpiredProjectSessionResponse(projectKey);
      }

      const projectSessionCookieName = getProjectSessionCookieName(projectKey);
      const projectSessionState = evaluateProjectSessionWindow(
        projectKey,
        cookieStore.get(projectSessionCookieName)?.value,
      );
      if (projectSessionState.hardExpired) {
        return hardExpiredProjectSessionResponse(projectKey);
      }

      // sign URL
      const expiresMs = 10 * 60 * 1000; // 10 minutes
      let url: string;
      try {
        [url] = await bucket.file(objectPath).getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + expiresMs,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes("PERMISSION_DENIED")) {
          url = buildProxyUrl(req, projectKey, objectPath);
        } else {
          throw error;
        }
      }

      const res = NextResponse.json({ ok: true, url, expiresAt: Date.now() + expiresMs });
      if (projectSessionState.shouldSetStartCookie) {
        applyProjectSessionStartCookie(res, projectKey, projectSessionState.nowSeconds);
      }
      return res;
    }
    // Public project path (no allowlist/session window enforcement needed)
    const expiresMs = 10 * 60 * 1000;
    let url: string;
    try {
      [url] = await bucket.file(objectPath).getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + expiresMs,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("PERMISSION_DENIED")) {
        url = buildProxyUrl(req, projectKey, objectPath);
      } else {
        throw error;
      }
    }
    return NextResponse.json({ ok: true, url, expiresAt: Date.now() + expiresMs });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, reason: "signed_url_failed", message }, { status: 500 });
  }
}
