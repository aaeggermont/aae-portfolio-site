import { NextResponse } from "next/server";
import { issueSessionCookieResponse } from "@/lib/auth/issueSessionCookieResponse";
import { cookies } from "next/headers";
import { getAdmin } from "@/lib/firebase/admin";
import {
  applyProjectSessionStartCookie,
  evaluateProjectSessionWindow,
  getProjectSessionCookieName,
  hardExpiredProjectSessionResponse,
  isHardExpiredFromAuthTime,
} from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { idToken, projectKey } = (await req.json()) as {
      idToken?: string;
      projectKey?: string;
    };

    if (!idToken) {
      return NextResponse.json({ ok: false, reason: "missing_idToken" }, { status: 400 });
    }

    if (projectKey) {
      const { auth } = getAdmin();
      const decoded = await auth.verifyIdToken(idToken, false);
      if (isHardExpiredFromAuthTime(decoded.auth_time)) {
        return hardExpiredProjectSessionResponse(projectKey);
      }
    }

    const res = await issueSessionCookieResponse(idToken);

    if (projectKey) {
      const cookieStore = await cookies();
      const sessionState = evaluateProjectSessionWindow(
        projectKey,
        cookieStore.get(getProjectSessionCookieName(projectKey))?.value,
      );

      if (sessionState.hardExpired) {
        return hardExpiredProjectSessionResponse(projectKey);
      }

      if (sessionState.shouldSetStartCookie) {
        applyProjectSessionStartCookie(res, projectKey, sessionState.nowSeconds);
      }
    }

    return res;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, reason: "session_refresh_failed", message: errorMessage },
      { status: 401 },
    );
  }
}
