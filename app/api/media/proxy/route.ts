import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdmin } from "@/lib/firebase/admin";
import { authorizeProjectMediaAccess } from "@/lib/auth/authorizeProjectMediaAccess";
import { applyProjectSessionStartCookie } from "@/lib/auth/projectSessionWindow";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { auth, db, bucket } = getAdmin();
    const cookieStore = await cookies();
    const { searchParams } = new URL(req.url);
    const projectKey = searchParams.get("projectKey") ?? "";
    const objectPath = searchParams.get("objectPath") ?? "";

    if (!projectKey || !objectPath) {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    if (objectPath.includes("..") || !objectPath.startsWith(`projects/${projectKey}/`)) {
      return NextResponse.json({ ok: false, reason: "invalid_path" }, { status: 400 });
    }

    const authResult = await authorizeProjectMediaAccess({
      auth,
      db,
      projectKey,
      cookieStore,
    });

    if (!authResult.ok) {
      if (authResult.hardExpiredResponse) return authResult.hardExpiredResponse;
      return NextResponse.json(
        {
          ok: false,
          reason: authResult.reason,
          ...(authResult.message ? { message: authResult.message } : {}),
        },
        { status: authResult.status },
      );
    }

    const file = bucket.file(objectPath);
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
    }

    const [metadata] = await file.getMetadata();
    const fileBuffer = await file.download();
    const contentType = metadata.contentType || "application/octet-stream";

    const res = new NextResponse(new Uint8Array(fileBuffer[0]), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
      },
    });

    if (authResult.shouldSetStartCookie) {
      applyProjectSessionStartCookie(res, projectKey, authResult.startCookieAtSeconds);
    }

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, reason: "proxy_failed", message }, { status: 500 });
  }
}
