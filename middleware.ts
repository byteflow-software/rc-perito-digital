import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "fallback-dev-secret"
);

const PUBLIC_PATHS = ["/admin/login", "/admin/api"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Noindex for all admin routes
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  // Allow public admin paths through
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return response;

  // Verify JWT cookie
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return response;
  } catch {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete("admin_token");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
