import { env } from "@/env";
import { catchError } from "@/helpers/catch-error";
import jwt from "jsonwebtoken";
import { setCookie } from "./cookie-utils";

const getTokenSecondsRemaining = (token: string): number => {
  if (!token) return 0;

  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedToken || !decodedToken.exp) return 0;

    const remainingSeconds = decodedToken.exp - Math.floor(Date.now() / 1000);
    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error: unknown) {
    console.log(catchError(error));
    return 0;
  }
};

export const setTokenInCookie = async (
  name: string,
  token: string,
  fallbackMaxAgeInSeconds: number = env.ACCESS_TOKEN_EXPIRES_IN,
) => {
  const secondsRemaining = getTokenSecondsRemaining(token);
  const maxAgeInSeconds =
    secondsRemaining > 0 ? secondsRemaining : fallbackMaxAgeInSeconds;

  await setCookie(name, token, maxAgeInSeconds);
};

export const isTokenExpiringSoon = (
  token: string,
  thresholdInSeconds: number = 300,
) => {
  const secondsRemaining = getTokenSecondsRemaining(token);
  return secondsRemaining > 0 && secondsRemaining <= thresholdInSeconds;
};
