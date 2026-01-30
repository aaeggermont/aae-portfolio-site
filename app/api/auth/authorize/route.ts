import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdmin } from "@/app/lib/firebase/admin";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json({ ok: false, reason: "missing_slug" }, { status: 400 });

  const session = cookies().get("session")?.value;
  if (!session) return NextResponse.json({ ok: false, reason: "no_session" }, { status: 401 });

  const { auth, db } = getAdmin();

  try {
    const decoded = await auth.verifySessionCookie(session, true);
    const uid = decoded.uid;

    const snap = await db.collection("access_allowlist").doc(uid).get();
    const data = snap.data();

    const enabled = data?.enabled === true;
    const allowedSlugs: string[] = Array.isArray(data?.allowedSlugs) ? data!.allowedSlugs : [];
    const allowed = enabled && allowedSlugs.includes(slug);

    if (!allowed) {
      return NextResponse.json({ ok: false, reason: "not_allowed" }, { status: 403 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_session" }, { status: 401 });
  }
}
