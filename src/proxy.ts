import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./lib/auth-utils";
import { jwtUtils } from "./lib/jwt-utils";
import {
  getTokenSecondsRemaining,
  isTokenExpiringSoon,
} from "./lib/token-utils";
import { authServices } from "./services/auth-service";
import { Role, RoleType } from "./types/enum-type";

type RefreshedCookieSet = {
  accessToken?: string;
  refreshToken?: string;
  sessionToken?: string;
};

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const requestHeaders = new Headers(request.headers);

    let accessToken = request.cookies.get("access_token")?.value;
    let refreshToken = request.cookies.get("refresh_token")?.value;
    let sessionToken = request.cookies.get("better-auth.session_token")?.value;

    let decodedAccessToken = accessToken
      ? (
          await jwtUtils.verifyToken(
            accessToken,
            env.ACCESS_TOKEN_SECRET as string,
          )
        ).data
      : null;

    let isValidAccessToken = accessToken
      ? (
          await jwtUtils.verifyToken(
            accessToken,
            env.ACCESS_TOKEN_SECRET as string,
          )
        ).success
      : false;

    // --- NEW REFRESH TOKEN LOGIC ---
    const needsRefresh =
      (!isValidAccessToken ||
        (accessToken && isTokenExpiringSoon(accessToken))) &&
      refreshToken &&
      sessionToken;

    let refreshedCookieSet: RefreshedCookieSet | null = null;

    if (needsRefresh) {
      const newTokens = await authServices.refreshTokens(
        refreshToken as string,
        sessionToken as string,
      );

      if (newTokens) {
        // Update local variables so the rest of the proxy logic uses the fresh data
        accessToken = newTokens.newAccessToken || accessToken;
        refreshToken = newTokens.newRefreshToken || refreshToken;
        sessionToken = newTokens.newSessionToken || sessionToken;

        refreshedCookieSet = {
          accessToken: newTokens.newAccessToken,
          refreshToken: newTokens.newRefreshToken,
          sessionToken: newTokens.newSessionToken,
        };

        const verifiedRefreshedAccessToken = accessToken
          ? await jwtUtils.verifyToken(
              accessToken,
              env.ACCESS_TOKEN_SECRET as string,
            )
          : { success: false as const, data: null };

        isValidAccessToken = verifiedRefreshedAccessToken.success;
        decodedAccessToken = verifiedRefreshedAccessToken.data;

        if (verifiedRefreshedAccessToken.success) {
          requestHeaders.set("x-token-refreshed", "1");
        }
      } else {
        // If refresh fails, ensure we treat the user as unauthenticated
        isValidAccessToken = false;
        accessToken = undefined;
      }
    }

    let userRole: RoleType | null = decodedAccessToken
      ? (decodedAccessToken.role as RoleType)
      : null;
    const routeOwner = getRouteOwner(pathname);
    const unifiedSuperAdminAndAdminRole =
      userRole === Role.SUPER_ADMIN ? Role.ADMIN : userRole;
    userRole = unifiedSuperAdminAndAdminRole;

    // --- ROUTING RULES ---
    let response: NextResponse;

    // Rule 1: Auth route while logged in
    if (isAuthRoute(pathname) && isValidAccessToken) {
      response = NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as RoleType), request.url),
      );
    }
    // Rule 2: Reset password routing
    else if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");
      if (email) {
        response = NextResponse.next({ request: { headers: requestHeaders } });
      } else {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        response = NextResponse.redirect(loginUrl);
      }
    }
    // Rule 3: Public route
    else if (routeOwner === null) {
      response = NextResponse.next({ request: { headers: requestHeaders } });
    }
    // Rule 4: Protected route without valid token
    else if (!isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      response = NextResponse.redirect(loginUrl);
    }
    // Rule 5: Required actions (verify email / change password)
    else if (isValidAccessToken && decodedAccessToken) {
      const { emailVerified, needPasswordChange, email, role } =
        decodedAccessToken;

      if (emailVerified === false && pathname !== "/verify-email") {
        const verifyEmailUrl = new URL("/verify-email", request.url);
        verifyEmailUrl.searchParams.set("email", email as string);
        response = NextResponse.redirect(verifyEmailUrl);
      } else if (!needPasswordChange && pathname === "/reset-password") {
        response = NextResponse.redirect(
          new URL(getDefaultDashboardRoute(role as RoleType), request.url),
        );
      } else {
        // Pass to rule 6/7 evaluations...
        if (routeOwner === "COMMON") {
          response = NextResponse.next({
            request: { headers: requestHeaders },
          });
        } else if (routeOwner !== userRole) {
          response = NextResponse.redirect(
            new URL(
              getDefaultDashboardRoute(userRole as RoleType),
              request.url,
            ),
          );
        } else {
          response = NextResponse.next({
            request: { headers: requestHeaders },
          });
        }
      }
    } else {
      // Fallback allowing request
      response = NextResponse.next({ request: { headers: requestHeaders } });
    }

    if (refreshedCookieSet?.accessToken) {
      const accessMaxAge = getTokenSecondsRemaining(
        refreshedCookieSet.accessToken,
      );
      response.cookies.set("access_token", refreshedCookieSet.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        ...(accessMaxAge > 0 ? { maxAge: accessMaxAge } : {}),
      });
    }

    if (refreshedCookieSet?.refreshToken) {
      const refreshMaxAge = getTokenSecondsRemaining(
        refreshedCookieSet.refreshToken,
      );
      response.cookies.set("refresh_token", refreshedCookieSet.refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        ...(refreshMaxAge > 0 ? { maxAge: refreshMaxAge } : {}),
      });
    }

    if (refreshedCookieSet?.sessionToken) {
      const refreshMaxAge = refreshedCookieSet.refreshToken
        ? getTokenSecondsRemaining(refreshedCookieSet.refreshToken)
        : 0;
      response.cookies.set(
        "better-auth.session_token",
        refreshedCookieSet.sessionToken,
        {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          path: "/",
          ...(refreshMaxAge > 0 ? { maxAge: refreshMaxAge } : {}),
        },
      );
    }

    return response;
  } catch (error) {
    console.error("Error in proxy logic:", error);
    // Safe fallback to prevent proxy crash from bringing down the whole app
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
