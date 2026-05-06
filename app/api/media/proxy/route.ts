import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdmin } from "@/lib/firebase/admin";
import {
  evaluateProjectSessionWindow,
  getProjectSessionCookieName,
  hardExpiredProjectSessionResponse,
  isHardExpiredFromAuthTime,
} from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

export async function GET(req: Request) {
  try {
    const { auth, db, bucket } = getAdmin();
    const cookieStore = await cookies();
    const { searchParams } = new URL(req.url);
    const projectKey = searchParams.get("projectKey") ?? "";
    const objectPath = searchParams.get("objectPath") ?? "";

    if (!projectKey || !objectPath) {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    if (objectPath.includes("..") || !objectPath.startsWith(`projects/${projectKey}/`)) {
      return NextResponse.json({ ok: false, reason: "invalid_path" }, { status: 400 });
    }

    const session = cookieStore.get("session")?.value;
    if (!session) {
      return NextResponse.json({ ok: false, reason: "no_session" }, { status: 401 });
    }

    let decoded: { uid: string; email?: string | null };
    try {
      decoded = (await auth.verifySessionCookie(session, false)) as {
        uid: string;
        email?: string | null;
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ ok: false, reason: "bad_session", message }, { status: 401 });
    }

    const projSnap = await db.collection("projects_data").doc(projectKey).get();
    const visibility = (projSnap.exists ? (projSnap.data() as any)?.visibility : "restricted") as
      | "public"
      | "restricted";

    if (visibility !== "public") {
      const email = normalizeEmail(decoded.email);
      const allowSnap = await db.collection("access_allowlist").doc(projectKey).get();
      const allow = (allowSnap.exists ? allowSnap.data() : {}) as any;
      const enabled = allow?.enabled !== false;
      const uidOk = Array.isArray(allow?.allowedUids) && allow.allowedUids.includes(decoded.uid);
      const emailOk =
        !!email &&
        Array.isArray(allow?.allowedEmails) &&
        allow.allowedEmails.map(normalizeEmail).includes(email);

      if (!enabled || (!uidOk && !emailOk)) {
        return NextResponse.json({ ok: false, reason: "not_allowed" }, { status: 403 });
      }

      if (isHardExpiredFromAuthTime((decoded as { auth_time?: number }).auth_time)) {
        return hardExpiredProjectSessionResponse(projectKey);
      }

      const projectSessionState = evaluateProjectSessionWindow(
        projectKey,
        cookieStore.get(getProjectSessionCookieName(projectKey))?.value,
      );
      if (projectSessionState.hardExpired) {
        return hardExpiredProjectSessionResponse(projectKey);
      }
    }

    const file = bucket.file(objectPath);
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
    }

    const [metadata] = await file.getMetadata();
    const fileBuffer = await file.download();
    const contentType = metadata.contentType || "application/octet-stream";

    return new Response(new Uint8Array(fileBuffer[0]), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, reason: "proxy_failed", message }, { status: 500 });
  }
}
