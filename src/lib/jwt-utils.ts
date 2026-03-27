import { catchError } from "@/helpers/catch-error";
import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    return {
      success: true,
      data: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: catchError(error, "Failed to verify token"),
    };
  }
};

const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
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
