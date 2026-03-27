import { API } from "@/lib/api-endpoints";
import { cookies } from "next/headers";

export const userServices = {
  getUserInfo: async () => {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("access_token")?.value;
      const sessionToken = cookieStore.get("better-auth.session_token")?.value;

      if (!accessToken || !sessionToken) {
        return null;
      }

      const response = await fetch(API.AUTH.ME, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}; better-auth.session_token=${sessionToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  },
};
