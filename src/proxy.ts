import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./lib/auth-utils";
import { jwtUtils } from "./lib/jwt-utils";
import { isTokenExpiringSoon } from "./lib/token-utils";
import { authServices } from "./services/auth-service";
import { userServices } from "./services/user-service";
import { Role, RoleType } from "./types/enum-type";

const checkNewTokenWithRefreshTokenGenerated = async (
  refreshToken: string,
): Promise<boolean> => {
  try {
    const refreshed =
      await authServices.isNewTokenWithRefreshTokenGenerated(refreshToken);

    if (!refreshed) {
      console.error("Failed to refresh token with refresh token");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const requestHeaders = new Headers(request.headers);
    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    const decodedAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, env.ACCESS_TOKEN_SECRET as string).data;

    const isValidAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, env.ACCESS_TOKEN_SECRET as string)
        .success;

    let userRole: RoleType | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as RoleType;
    }

    const routeOwner = getRouteOwner(pathname);

    const unifiedSuperAdminAndAdminRole =
      userRole === Role.SUPER_ADMIN ? Role.ADMIN : userRole;

    userRole = unifiedSuperAdminAndAdminRole;

    // proactively refresh token if refresh token is available and access token is expiring soon
    if (
      isValidAccessToken &&
      refreshToken &&
      isTokenExpiringSoon(accessToken)
    ) {
      try {
        const refreshed =
          await checkNewTokenWithRefreshTokenGenerated(refreshToken);

        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }

    // Rule 1: user is logged in (has valid access token) and trying to access auth route -> redirect to default dashboard
    if (isAuthRoute(pathname) && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as RoleType), request.url),
      );
    }

    // Rule 2: user is trying to access reset-password page -> user coming from forgot-password page
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (email) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      // redirect
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Rule 3: user is trying to access public route -> allow
    if (routeOwner === null) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Rule 4: user is not logged in but trying to access protected route -> redirect to login page
    if (!accessToken && !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Rule 5: Ensuring user to stay in reset-password or verify email page if their needPasswordChange are not satisfied respectively
    if (accessToken) {
      const userInfo = await userServices.getUserInfo();

      if (userInfo) {
        // verify email scenario
        if (userInfo.emailVerified === false) {
          if (pathname !== "/verify-email") {
            const verifyEmailUrl = new URL("/verify-email", request.url);
            verifyEmailUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(verifyEmailUrl);
          }

          NextResponse.next();
        }

        // reset password scenario
        if (!userInfo.needPasswordChange && pathname === "/reset-password") {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userInfo.role), request.url),
          );
        }
      }
    }

    // Rule 6: user is trying to access common protected route -> allow
    if (routeOwner === "COMMON") {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Rule 7: user is trying to visit role based protected route but doesn't have required role -> redirect to default dashboard
    if (
      routeOwner === Role.ADMIN ||
      routeOwner === Role.MERCHANT ||
      routeOwner === Role.RIDER
    ) {
      if (routeOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as RoleType), request.url),
        );
      }
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Error in proxy middleware:", error);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
