import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";

import { getAdmin } from "@/lib/firebase/admin";

export class AdminAuthError extends Error {
  status: number;
  reason: string;

  constructor(status: number, reason: string) {
    super(reason);
    this.status = status;
    this.reason = reason;
  }
}

/**
 * Requires a Firebase session cookie or Bearer ID token with `admin: true` claim.
 */
export async function requireAdmin(req: Request): Promise<DecodedIdToken> {
  const { auth } = getAdmin();
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;
  if (session) {
    try {
      const decoded = await auth.verifySessionCookie(session, true);
      if (decoded.admin === true) return decoded;
      throw new AdminAuthError(403, "not_admin");
    } catch (err) {
      if (err instanceof AdminAuthError) throw err;
      // fall through to Bearer
    }
  }

  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
  const bearer = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!bearer) {
    throw new AdminAuthError(401, "no_session");
  }

  try {
    const decoded = await auth.verifyIdToken(bearer, true);
    if (decoded.admin !== true) {
      throw new AdminAuthError(403, "not_admin");
    }
    return decoded;
  } catch (err) {
    if (err instanceof AdminAuthError) throw err;
    throw new AdminAuthError(401, "invalid_session");
  }
}
