import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdmin } from "@/lib/firebase/admin";
import {
  assertAccessCodeStillValid,
  PORTFOLIO_ACCESS_COOKIE,
  readPortfolioAccessCookie,
} from "@/lib/auth/projectAccessCodeSession";

export const runtime = "nodejs";

/**
 * Lightweight check for the header Sign out control:
 * returns whether a portfolio access-code session is currently active.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const portfolio = readPortfolioAccessCookie(
      cookieStore.get(PORTFOLIO_ACCESS_COOKIE)?.value,
    );

    if (!portfolio.ok) {
      return NextResponse.json({ ok: true, active: false });
    }

    const { db } = getAdmin();
    const projectKey = portfolio.projectKeys[0];
    if (!projectKey) {
      return NextResponse.json({ ok: true, active: false });
    }

    const live = await assertAccessCodeStillValid({
      db,
      projectKey,
      codeHash: portfolio.codeHash,
    });

    return NextResponse.json({
      ok: true,
      active: live.ok,
      projectKeys: live.ok ? live.projectKeys : [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, active: false, reason: "status_failed", message },
      { status: 500 },
    );
  }
}
