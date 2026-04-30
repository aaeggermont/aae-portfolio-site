import { NextResponse } from "next/server";
import { issueSessionCookieResponse } from "@/lib/auth/issueSessionCookieResponse";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { idToken } = (await req.json()) as { idToken?: string };

    if (!idToken) {
      return NextResponse.json({ ok: false, reason: "missing_idToken" }, { status: 400 });
    }

    return await issueSessionCookieResponse(idToken);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, reason: "session_refresh_failed", message: errorMessage },
      { status: 401 },
    );
  }
}
