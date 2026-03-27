import { API } from "@/lib/api-endpoints";
import { setTokenInCookie } from "@/lib/token-utils";

export const authServices = {
  isNewTokenWithRefreshTokenGenerated: async (
    refreshToken: string,
  ): Promise<boolean> => {
    try {
      const response = await fetch(API.AUTH.REFRESH_TOKENS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      const { newAccessToken, newRefreshToken, newSessionToken } = data;

      if (newAccessToken) {
        await setTokenInCookie("access_token", newAccessToken);
      }

      if (newRefreshToken) {
        await setTokenInCookie("refresh_token", newRefreshToken);
      }

      if (newSessionToken) {
        await setTokenInCookie("better-auth.session_token", newSessionToken);
      }

      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  },
};
