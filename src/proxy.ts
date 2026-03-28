import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./lib/auth-utils";
import { jwtUtils } from "./lib/jwt-utils";
import { isTokenExpiringSoon, parseDurationToSecond } from "./lib/token-utils";
import { authServices } from "./services/auth-service";
import { Role, RoleType } from "./types/enum-type";

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const requestHeaders = new Headers(request.headers);

    let accessToken = request.cookies.get("access_token")?.value;
    let refreshToken = request.cookies.get("refresh_token")?.value;
    let sessionToken = request.cookies.get("better-auth.session_token")?.value;

    // ADD AWAIT HERE
    let decodedAccessToken = accessToken
      ? (
          await jwtUtils.verifyToken(
            accessToken,
            env.ACCESS_TOKEN_SECRET as string,
          )
        ).data
      : null;

    // ADD AWAIT HERE
    let isValidAccessToken = accessToken
      ? (
          await jwtUtils.verifyToken(
            accessToken,
            env.ACCESS_TOKEN_SECRET as string,
          )
        ).success
      : false;

    // --- NEW REFRESH TOKEN LOGIC ---
    // Trigger refresh if access token is invalid/missing OR expiring soon, BUT we still have refresh & session tokens
    const needsRefresh =
      (!isValidAccessToken ||
        (accessToken && isTokenExpiringSoon(accessToken))) &&
      refreshToken &&
      sessionToken;

    // Array to hold new cookies so we can attach them to the final response
    const cookiesToSet: { name: string; value: string; maxAge: number }[] = [];

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

        isValidAccessToken = true;
        decodedAccessToken = (
          await jwtUtils.verifyToken(
            accessToken!,
            env.ACCESS_TOKEN_SECRET as string,
          )
        ).data;

        requestHeaders.set("x-token-refreshed", "1");

        // Prepare cookies to be set on the NextResponse later
        const defaultMaxAge = parseDurationToSecond(
          String(env.ACCESS_TOKEN_EXPIRES_IN),
        );

        if (newTokens.newAccessToken) {
          cookiesToSet.push({
            name: "access_token",
            value: newTokens.newAccessToken,
            maxAge: defaultMaxAge,
          });
        }
        if (newTokens.newRefreshToken) {
          cookiesToSet.push({
            name: "refresh_token",
            value: newTokens.newRefreshToken,
            maxAge: defaultMaxAge * 24,
          }); // Adjust fallback maxAge as needed
        }
        if (newTokens.newSessionToken) {
          cookiesToSet.push({
            name: "better-auth.session_token",
            value: newTokens.newSessionToken,
            maxAge: defaultMaxAge * 24,
          });
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

    // --- APPLY NEW COOKIES TO THE RESPONSE ---
    // Next.js strictly requires cookies to be set on the outgoing response object in middleware/proxy
    if (cookiesToSet.length > 0) {
      cookiesToSet.forEach((cookie) => {
        response.cookies.set(cookie.name, cookie.value, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          path: "/",
          maxAge: cookie.maxAge,
        });
      });
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
