import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdmin } from "@/lib/firebase/admin";

export const runtime = "nodejs";

type ProjectMeta = {
  projectId?: number;
  projectKey?: string; // "project_4"
  visibility?: "public" | "restricted";
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

async function isAllowedForProject(params: {
  db: FirebaseFirestore.Firestore;
  projectKey: string;
  uid: string;
  email: string | null;
}) {
  const { db, projectKey, uid, email } = params;

  const snap = await db.collection("access_allowlist").doc(projectKey).get();
  if (!snap.exists) return false;

  const data = snap.data() as {
    enabled?: boolean;
    allowedUids?: string[];
    allowedEmails?: string[];
  };

  const enabled = data.enabled !== false;
  const uidOk = (data.allowedUids ?? []).includes(uid);
  const emailOk = (data.allowedEmails ?? []).map(normalizeEmail).includes(normalizeEmail(email));

  return enabled && (uidOk || emailOk);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const projectKey = searchParams.get("projectKey"); // "project_4"
  const path = searchParams.get("path"); // "projects/project_4/images/hero.png"

  if (!projectKey || !path) {
    return NextResponse.json({ ok: false, error: "missing_params" }, { status: 400 });
  }

  // Safety: ensure the path actually belongs to that projectKey
  if (!path.startsWith(`projects/${projectKey}/`)) {
    return NextResponse.json({ ok: false, error: "path_project_mismatch" }, { status: 400 });
  }

  const { auth, db, storage } = getAdmin();

  // 1) Look up project visibility (public vs restricted)
  // If you already store this in projects_data, prefer that.
  // If you don't have a "projectKey" indexed field, easiest is to store a doc keyed by projectKey:
  // project_meta/{projectKey}
  const metaSnap = await db.collection("project_meta").doc(projectKey).get();
  const meta = (metaSnap.exists ? (metaSnap.data() as ProjectMeta) : {}) as ProjectMeta;

  const visibility = meta.visibility ?? "restricted"; // safest default

  // 2) If restricted, require session + allowlist
  if (visibility === "restricted") {
    const session = (await cookies()).get("session")?.value;
    if (!session) {
      return NextResponse.json({ ok: false, error: "no_session" }, { status: 401 });
    }

    let decoded: { uid: string; email?: string };
    try {
      decoded = await auth.verifySessionCookie(session, true) as any;
    } catch {
      return NextResponse.json({ ok: false, error: "bad_session" }, { status: 401 });
    }

    const ok = await isAllowedForProject({
      db,
      projectKey,
      uid: decoded.uid,
      email: decoded.email ?? null,
    });

    if (!ok) {
      return NextResponse.json({ ok: false, error: "not_allowed" }, { status: 403 });
    }
  }

  // 3) Generate signed URL (works for both public + restricted)
  const bucket = storage.bucket("mainportfolio-d3604.firebasestorage.app");
  const file = bucket.file(path);

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 1000 * 60 * 10, // 10 minutes
  });

  return NextResponse.json({ ok: true, url, visibility });
}

export async function POST(req: Request) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ ok: false, reason: "missing_idToken" }, { status: 400 });
  }

  const { auth } = getAdmin();

  // Verify ID token (from Firebase client)
  const decoded = await auth.verifyIdToken(idToken);

  // Create Firebase session cookie
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in ms
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

  // ✅ Set cookie (IMPORTANT FLAGS)
  cookies().set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ false on localhost
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(expiresIn / 1000),
  });

  return NextResponse.json({ ok: true, uid: decoded.uid });
}