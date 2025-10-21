import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Protect admin routes
    if (isAdminRoute && !isAdmin) {
      // Redirect to login if not admin
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Allow access to auth pages without token
        if (
          pathname.startsWith("/auth/login") ||
          pathname.startsWith("/auth/register")
        ) {
          return true;
        }

        // Require token for admin routes
        if (pathname.startsWith("/admin")) {
          return !!token;
        }

        // Allow all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/auth/login", "/auth/register"],
};
