import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { ILoginResponse } from "@/types/auth-type";
import { IUser } from "@/types/user-type";
import {
  IRegisterMerchantPayload,
  IVerifyEmailPayload,
} from "@/validators/auth-validators";

export const authServices = {
  refreshTokens: async (refreshToken: string, sessionToken: string) => {
    try {
      const response = await fetch(API.AUTH.REFRESH_TOKENS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Pass BOTH tokens so the backend can validate the session and the refresh token
          Cookie: `refresh_token=${refreshToken}; better-auth.session_token=${sessionToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      // Return the payload so proxy.ts can set the cookies on the NextResponse
      return await response.json();
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
};
