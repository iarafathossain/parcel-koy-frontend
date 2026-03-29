import { IJwtPayload } from "@/types/auth-type";
import { cookies } from "next/headers";
import { jwtUtils } from "./jwt-utils";

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return null;
    }

    // Decode the token synchronously (no secret needed just to read the data)
    const decoded = jwtUtils.decodeToken(accessToken);

    if (decoded.success && decoded.data) {
      return decoded.data as unknown as IJwtPayload;
    }

    return null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};
