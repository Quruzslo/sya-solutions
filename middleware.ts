import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin-belepes/fiok")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin-belepes", req.url));
    }

    if (userRole !== "admin" && userRole !== "editor") {
      return NextResponse.redirect(new URL("/admin-belepes", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin-belepes/:path*", "/api/admin/:path*"],
};
