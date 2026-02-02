import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Only protect /admin
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const slug = pathname.split("/")[2]; // "/work/{slug}"
  if (!slug) return NextResponse.next();

  // Call our Node runtime endpoint to verify session + allowlist.
  const authzUrl = new URL("/api/auth/authorize", req.url);
  authzUrl.searchParams.set("slug", slug);

  const res = await fetch(authzUrl, {
    headers: {
      // forward cookies
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  if (res.ok) return NextResponse.next();

  // Redirect to login (keep next= for after login)
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
