"use server";

import { env } from "@/env";
import { getBackendAPIResponseError } from "@/helpers/backend-api-res";
import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import {
  getDefaultDashboardRoute,
  isValidRedirectPathForRole,
} from "@/lib/auth-utils";
import { httpClient } from "@/lib/axios/http-client";
import { setTokenInCookie } from "@/lib/token-utils";
import { APIErrorResponse } from "@/types/api-type";
import { ILoginResponse } from "@/types/auth-type";
import { RoleType } from "@/types/enum-type";
import {
  ILoginUserPayload,
  loginUserZodSchema,
} from "@/validators/auth-validators";
import { redirect } from "next/navigation";

const getValidationErrorResponse = (payload: ILoginUserPayload) => {
  const parsedPayload = loginUserZodSchema.safeParse(payload);

  if (parsedPayload.success) {
    return { parsedPayload, errorResponse: null };
  }

  const firstError = parsedPayload.error.issues[0].message || "Invalid input";

  return {
    parsedPayload: null,
    errorResponse: {
      success: false as const,
      message: firstError,
    },
  };
};

const setLoginCookies = async (
  token: string,
  accessToken: string,
  refreshToken: string,
) => {
  await Promise.all([
    setTokenInCookie(
      "better-auth.session_token",
      token,
      env.ACCESS_TOKEN_EXPIRES_IN,
    ),
    setTokenInCookie("access_token", accessToken),
    setTokenInCookie("refresh_token", refreshToken),
  ]);
};

const getTargetRoute = (redirectTo: string | undefined, role: RoleType) => {
  if (redirectTo && isValidRedirectPathForRole(redirectTo, role)) {
    return redirectTo;
  }

  return getDefaultDashboardRoute(role);
};

const isNextRedirectError = (error: unknown): error is { digest: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
};

export const loginAction = async (
  payload: ILoginUserPayload,
  redirectTo?: string,
): Promise<ILoginResponse | APIErrorResponse> => {
  try {
    const { parsedPayload, errorResponse } =
      getValidationErrorResponse(payload);

    if (!parsedPayload) {
      return errorResponse as APIErrorResponse;
    }

    const response = await httpClient.post<ILoginResponse>(
      API.AUTH.LOGIN,
      parsedPayload.data,
    );

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.message || "Login failed. Please try again.",
      };
    }

    const { sessionToken, accessToken, refreshToken, user } = response.data;
    const role = user.role as RoleType;

    await setLoginCookies(sessionToken, accessToken, refreshToken);

    if (!user.emailVerified) {
      redirect("/verify-email");
    } else if (user.needPasswordChange) {
      redirect("/change-password");
    } else {
      const targetRoute = getTargetRoute(redirectTo, role);

      redirect(targetRoute);
    }
  } catch (error: unknown) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    const { code, message } = getBackendAPIResponseError(error);

    if (code === "EMAIL_NOT_VERIFIED" && message === "Email not verified") {
      redirect(`/verify-email?email=${payload.email}`);
    }

    return {
      success: false,
      message:
        message ||
        catchError(error, "An unexpected error occurred. Please try again."),
    };
  }
};
