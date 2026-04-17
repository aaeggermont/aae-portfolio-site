import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdmin } from "@/lib/firebase/admin";

type Body = {
  projectKey: string;  // "project_4"
  objectPath: string;  // "projects/project_4/GenericTaskFlow.png"
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

export async function POST(req: Request) {
  const { auth, db, bucket } = getAdmin();

  const { projectKey, objectPath } = (await req.json()) as Body;

  if (!projectKey || !objectPath) {
    return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
  }

  // basic safety: ensure callers can’t request arbitrary files
  if (objectPath.includes("..") || !objectPath.startsWith(`projects/${projectKey}/`)) {
    return NextResponse.json({ ok: false, reason: "invalid_path" }, { status: 400 });
  }

  // verify session cookie
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return NextResponse.json({ ok: false, reason: "no_session" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await auth.verifySessionCookie(session, true);
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_session" }, { status: 401 });
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
    const user = await auth.getUser(uid);
    const email = normalizeEmail(user.email);

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
  }

  // sign URL
  const expiresMs = 10 * 60 * 1000; // 10 minutes
  const [url] = await bucket.file(objectPath).getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + expiresMs,
  });

  return NextResponse.json({ ok: true, url, expiresAt: Date.now() + expiresMs });
}
