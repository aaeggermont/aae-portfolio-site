import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "session";

/** Default: 5 days */
const DEFAULT_SESSION_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

function getSessionMaxAgeSeconds(): number {
  const raw = process.env.SESSION_COOKIE_MAX_AGE_SECONDS;
  if (raw === undefined || raw === "") return DEFAULT_SESSION_MAX_AGE_SECONDS;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_SESSION_MAX_AGE_SECONDS;
  return Math.floor(n);
}

/**
 * Verifies a Firebase ID token and sets the httpOnly session cookie used by API routes.
 * Cookie lifetime is controlled by `SESSION_COOKIE_MAX_AGE_SECONDS` (seconds).
 */
export async function issueSessionCookieResponse(idToken: string) {
  const { auth } = getAdmin();

  await auth.verifyIdToken(idToken, false);

  const maxAgeSeconds = getSessionMaxAgeSeconds();
  const expiresInMs = maxAgeSeconds * 1000;

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: expiresInMs,
  });

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionCookie,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });

  return res;
}
