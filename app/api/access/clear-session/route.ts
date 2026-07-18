import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  clearAccessCodeSessionCookie,
  PORTFOLIO_ACCESS_COOKIE,
  readPortfolioAccessCookie,
} from "@/lib/auth/projectAccessCodeSession";
import { getProjectSessionCookieName } from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

type Body = {
  projectKey?: string;
  projectKeys?: string[];
};

/** Clears portfolio access-code session (+ legacy per-project cookies / start markers). */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const cookieStore = await cookies();
    const portfolio = readPortfolioAccessCookie(
      cookieStore.get(PORTFOLIO_ACCESS_COOKIE)?.value,
    );

    const projectKeys = Array.from(
      new Set([
        ...(Array.isArray(body.projectKeys) ? body.projectKeys : []),
        ...(body.projectKey ? [body.projectKey] : []),
        ...(portfolio.ok ? portfolio.projectKeys : []),
      ]),
    );

    const res = NextResponse.json({ ok: true });
    clearAccessCodeSessionCookie(res, projectKeys);

    for (const projectKey of projectKeys) {
      res.cookies.set({
        name: getProjectSessionCookieName(projectKey),
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    }

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, reason: "clear_failed", message },
      { status: 500 },
    );
  }
}
