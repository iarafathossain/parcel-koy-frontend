import { API } from "@/lib/api-endpoints";

export const authServices = {
  // Renamed for clarity, and now accepts both tokens
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
};
