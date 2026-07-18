import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdmin } from "@/lib/firebase/admin";
import {
  applyMediaAuthCookies,
  authorizeProjectMediaAccess,
  bearerTokenFromRequest,
} from "@/lib/auth/authorizeProjectMediaAccess";

export const runtime = "nodejs";

type Body = {
  projectKey: string;
  objectPath: string;
};

function buildProxyUrl(req: Request, projectKey: string, objectPath: string) {
  const url = new URL("/api/media/proxy", req.url);
  url.searchParams.set("projectKey", projectKey);
  url.searchParams.set("objectPath", objectPath);
  return url.toString();
}

export async function POST(req: Request) {
  try {
    const { auth, db, bucket } = getAdmin();
    const cookieStore = await cookies();
    const { projectKey, objectPath } = (await req.json()) as Body;

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
      bearerToken: bearerTokenFromRequest(req),
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

    const expiresMs = 10 * 60 * 1000;
    let url: string;
    try {
      [url] = await bucket.file(objectPath).getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + expiresMs,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("PERMISSION_DENIED")) {
        url = buildProxyUrl(req, projectKey, objectPath);
      } else {
        throw error;
      }
    }

    const res = NextResponse.json({
      ok: true,
      url,
      expiresAt: Date.now() + expiresMs,
      via: authResult.via,
    });
    applyMediaAuthCookies(res, projectKey, authResult);
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, reason: "signed_url_failed", message },
      { status: 500 },
    );
  }
}
