import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // Try to verify token — if it fails, user is logged out
  let isLoggedIn = false;
  try {
    if (token) {
      await verifyToken(token);
      isLoggedIn = true;
    }
  } catch {
    isLoggedIn = false;
  }

  // Logged out + protected route → send to login
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in + auth route → send to feed
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/feed", req.url));
  }

  console.log("PATH:", req.nextUrl.pathname);
  // Everything else → let through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
