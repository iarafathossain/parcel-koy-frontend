import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { APIResponse } from "@/types/api-type";
import { ILoginResponse } from "@/types/auth-type";
import { IUser } from "@/types/user-type";
import {
  IChangePasswordPayload,
  IForgotPasswordPayload,
  IRegisterMerchantPayload,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from "@/validators/auth-validators";

type RefreshedTokenPayload = {
  newAccessToken?: string;
  newRefreshToken?: string;
  newSessionToken?: string;
};

export const authServices = {
  refreshTokens: async (refreshToken: string, sessionToken: string) => {
    try {
      const response = await fetch(API.AUTH.REFRESH_TOKENS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}; better-auth.session_token=${sessionToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const payload = await response.json();

      if (!payload || typeof payload !== "object") {
        return null;
      }

      const wrapped = payload as APIResponse<RefreshedTokenPayload>;
      return wrapped.data ?? null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  },
  registerMerchant: async (payload: IRegisterMerchantPayload) => {
    try {
      const response = await httpClient.post<{ user: IUser }>(
        API.AUTH.REGISTER,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
  verifyEmail: async (payload: IVerifyEmailPayload) => {
    try {
      const response = await httpClient.post<ILoginResponse>(
        API.AUTH.VERIFY_EMAIL,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Email verification failed");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (payload: IForgotPasswordPayload) => {
    try {
      const response = await httpClient.post<null>(
        API.AUTH.FORGOT_PASSWORD,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to send OTP");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (payload: IResetPasswordPayload) => {
    try {
      const response = await httpClient.post<null>(
        API.AUTH.RESET_PASSWORD,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to reset password");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (payload: IChangePasswordPayload) => {
    try {
      const response = await httpClient.post<null>(
        API.AUTH.CHANGE_PASSWORD,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to change password");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
};
