import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdmin } from "@/lib/firebase/admin";
import {
  assertAccessCodeStillValid,
  clearAccessCodeSessionCookie,
  PORTFOLIO_ACCESS_COOKIE,
  readAccessCodeSession,
  readPortfolioAccessCookie,
} from "@/lib/auth/projectAccessCodeSession";
import {
  evaluateProjectSessionWindow,
  getProjectSessionCookieName,
} from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectKey = (searchParams.get("projectKey") ?? "").trim();

    if (!projectKey) {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    const { db, auth } = getAdmin();
    const cookieStore = await cookies();

    const projSnap = await db.collection("projects_data").doc(projectKey).get();
    const visibility = (
      projSnap.exists
        ? (projSnap.data() as { visibility?: string })?.visibility
        : "restricted"
    ) as "public" | "restricted";

    if (visibility === "public") {
      return NextResponse.json({
        ok: true,
        allowed: true,
        via: "public",
        visibility,
      });
    }

    const accessSession = readAccessCodeSession(projectKey, cookieStore);

    if (accessSession.ok) {
      const live = await assertAccessCodeStillValid({
        db,
        projectKey,
        codeHash: accessSession.codeHash,
      });

      if (!live.ok) {
        const res = NextResponse.json({
          ok: true,
          allowed: false,
          via: null,
          visibility,
          reason: live.reason,
        });
        clearAccessCodeSessionCookie(res, accessSession.projectKeys);
        return res;
      }

      const windowState = evaluateProjectSessionWindow(
        projectKey,
        cookieStore.get(getProjectSessionCookieName(projectKey))?.value,
      );
      if (!windowState.hardExpired) {
        return NextResponse.json({
          ok: true,
          allowed: true,
          via: "access_code",
          visibility,
          projectKeys: live.projectKeys,
        });
      }
    }

    const session = cookieStore.get("session")?.value;
    if (session) {
      try {
        await auth.verifySessionCookie(session, false);
        return NextResponse.json({
          ok: true,
          allowed: false,
          via: "firebase_session",
          visibility,
          hasFirebaseSession: true,
        });
      } catch {
        // ignore
      }
    }

    return NextResponse.json({
      ok: true,
      allowed: false,
      via: null,
      visibility,
      hasPortfolioCookie: Boolean(
        readPortfolioAccessCookie(cookieStore.get(PORTFOLIO_ACCESS_COOKIE)?.value).ok,
      ),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, reason: "status_failed", message },
      { status: 500 },
    );
  }
}
