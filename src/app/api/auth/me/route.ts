import { API } from "@/lib/api-endpoints";
import { getTokenSecondsRemaining } from "@/lib/token-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RefreshedTokens = {
  accessToken?: string;
  refreshToken?: string;
  sessionToken?: string;
};

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("better-auth.session_token");
  response.cookies.delete("better-auth.session_data");
};

const tryRefreshTokens = async (
  refreshToken: string,
  sessionToken: string,
  sessionData?: string,
): Promise<RefreshedTokens | null> => {
  const refreshCookieParts = [
    `refresh_token=${refreshToken}`,
    `better-auth.session_token=${sessionToken}`,
  ];

  if (sessionData) {
    refreshCookieParts.push(`better-auth.session_data=${sessionData}`);
  }

  const refreshResponse = await fetch(API.AUTH.REFRESH_TOKENS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: refreshCookieParts.join("; "),
    },
  });

  if (!refreshResponse.ok) {
    return null;
  }

  const refreshed = await refreshResponse.json();
  const tokens = refreshed?.data as
    | {
        newAccessToken?: string;
        newRefreshToken?: string;
        newSessionToken?: string;
      }
    | undefined;

  return {
    accessToken: tokens?.newAccessToken,
    refreshToken: tokens?.newRefreshToken,
    sessionToken: tokens?.newSessionToken,
  };
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_token")?.value;
    let refreshToken = cookieStore.get("refresh_token")?.value;
    let sessionToken = cookieStore.get("better-auth.session_token")?.value;
    const sessionData = cookieStore.get("better-auth.session_data")?.value;
    let latestRefreshedTokens: RefreshedTokens | null = null;

    if (!sessionToken) {
      const unauthorized = NextResponse.json(null, { status: 401 });
      clearAuthCookies(unauthorized);
      return unauthorized;
    }

    if (!accessToken && refreshToken) {
      const refreshedTokens = await tryRefreshTokens(
        refreshToken,
        sessionToken,
        sessionData,
      );

      if (refreshedTokens?.accessToken) {
        accessToken = refreshedTokens.accessToken;
        refreshToken = refreshedTokens.refreshToken || refreshToken;
        sessionToken = refreshedTokens.sessionToken || sessionToken;
        latestRefreshedTokens = refreshedTokens;
      }
    }

    if (!accessToken) {
      const unauthorized = NextResponse.json(null, { status: 401 });
      clearAuthCookies(unauthorized);
      return unauthorized;
    }

    const requestMe = async (token: string, session: string) => {
      return fetch(API.AUTH.ME, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${token}; better-auth.session_token=${session}`,
        },
      });
    };

    let response = await requestMe(accessToken, sessionToken);

    // Retry once after refresh if access token expired between page load and request.
    if (!response.ok && refreshToken) {
      const refreshedTokens = await tryRefreshTokens(
        refreshToken,
        sessionToken,
        sessionData,
      );

      if (refreshedTokens?.accessToken) {
        accessToken = refreshedTokens.accessToken;
        refreshToken = refreshedTokens.refreshToken || refreshToken;
        sessionToken = refreshedTokens.sessionToken || sessionToken;
        latestRefreshedTokens = refreshedTokens;
        response = await requestMe(accessToken, sessionToken);
      }
    }

    if (!response.ok) {
      const unauthorized = NextResponse.json(null, { status: 401 });
      clearAuthCookies(unauthorized);
      return unauthorized;
    }

    const { data } = await response.json();
    const success = NextResponse.json(data);

    if (latestRefreshedTokens?.accessToken) {
      const accessMaxAge = getTokenSecondsRemaining(
        latestRefreshedTokens.accessToken,
      );
      success.cookies.set("access_token", latestRefreshedTokens.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        ...(accessMaxAge > 0 ? { maxAge: accessMaxAge } : {}),
      });
    }

    if (latestRefreshedTokens?.refreshToken) {
      const refreshMaxAge = getTokenSecondsRemaining(
        latestRefreshedTokens.refreshToken,
      );
      success.cookies.set("refresh_token", latestRefreshedTokens.refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        ...(refreshMaxAge > 0 ? { maxAge: refreshMaxAge } : {}),
      });
    }

    if (latestRefreshedTokens?.sessionToken) {
      const refreshMaxAge = latestRefreshedTokens.refreshToken
        ? getTokenSecondsRemaining(latestRefreshedTokens.refreshToken)
        : 0;
      success.cookies.set(
        "better-auth.session_token",
        latestRefreshedTokens.sessionToken,
        {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          path: "/",
          ...(refreshMaxAge > 0 ? { maxAge: refreshMaxAge } : {}),
        },
      );
    }

    return success;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
