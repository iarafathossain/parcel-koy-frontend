import { catchError } from "@/helpers/catch-error";
import { decodeJwt, jwtVerify } from "jose";

// NOTE: verification with jose is asynchronous
const verifyToken = async (token: string, secret: string) => {
  try {
    const encodedSecret = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, encodedSecret);

    return {
      success: true,
      data: payload,
    };
  } catch (error) {
    return {
      success: false,
      message: catchError(error, "Failed to verify token"),
    };
  }
};

// Decoding doesn't require the secret and is synchronous
const decodeToken = (token: string) => {
  try {
    const decoded = decodeJwt(token);
    return {
      success: true,
      data: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: catchError(error, "Failed to decode token"),
    };
  }
};

export const jwtUtils = {
  verifyToken,
  decodeToken,
};
