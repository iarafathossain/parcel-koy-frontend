import { IJwtPayload } from "@/types/auth-type";
import { cookies } from "next/headers";
import { jwtUtils } from "./jwt-utils";

const isDynamicServerUsageError = (
  error: unknown,
): error is { digest: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest === "DYNAMIC_SERVER_USAGE"
  );
};

export const getCurrentUserFromToken = async () => {
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
    if (isDynamicServerUsageError(error)) {
      return null;
    }

    console.error("Failed to get current user:", error);
    return null;
  }
};
