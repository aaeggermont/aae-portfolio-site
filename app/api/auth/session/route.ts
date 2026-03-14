import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("SESSION ROUTE HIT"); // 👈 ADD HERE
  console.log("admin projectId =", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

  try {
    const { idToken } = (await req.json()) as { idToken?: string };

    if (!idToken) {
      console.log("No idToken received");
      // return NextResponse.json({ ok: false }, { status: 400 });
      return NextResponse.json({ ok: false, reason: "missing_idToken" }, { status: 400 });
    }

    const { auth } = getAdmin();

    await auth.verifyIdToken(idToken, true);

    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ ok: true });

    res.cookies.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(expiresIn / 1000),
    });

    console.log("Session cookie set"); // 👈 Optional second log

    return res;
  } catch (err) {
    console.error("Session creation error:", err);
    // return NextResponse.json({ ok: false }, { status: 401 });
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, reason: "session_create_failed", message: errorMessage },
      { status: 401 }
    );
  }
}
