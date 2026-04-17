import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdmin } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // Delete cookie
  res.cookies.set({
    name: "session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}

/*
export async function POST() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  // If session exists, optionally revoke it in Firebase
  if (session) {
    try {
      const { auth } = getAdmin();
      const decoded = await auth.verifySessionCookie(session);
      await auth.revokeRefreshTokens(decoded.uid);
    } catch {
      // Ignore errors (cookie may already be invalid/expired)
    }
  }

  // Delete the session cookie
  cookieStore.set({
    name: "session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // expires immediately
  });

  return NextResponse.json({ ok: true });
}*/
