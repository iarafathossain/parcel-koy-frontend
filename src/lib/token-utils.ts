import { env } from "@/env";
import { catchError } from "@/helpers/catch-error";
import { setCookie } from "./cookie-utils";

export const parseDurationToSecond = (duration: string): number => {
  const parsedDuration = duration.trim().toLowerCase();
  const match = parsedDuration.match(/^(\d+)(ms|s|m|h|d)?$/);

  if (!match) {
    throw new Error(
      `Invalid duration format: "${duration}". Use formats like 500ms, 30s, 15m, 12h, 7d, or a plain number (seconds).`,
    );
  }

  const value = Number(match[1]);
  const unit = match[2] ?? "s";

  const unitToSeconds: Record<string, number> = {
    ms: 1 / 1000,
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
  };

  return Math.max(0, Math.floor(value * unitToSeconds[unit]));
};

export const getTokenSecondsRemaining = (token: string): number => {
  if (!token) return 0;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return 0;

    // Fix base64url encoding to standard base64
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");

    // Decode the payload
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const decodedToken = JSON.parse(jsonPayload);

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
  fallbackMaxAgeInSeconds: number = parseDurationToSecond(
    String(env.ACCESS_TOKEN_EXPIRES_IN),
  ),
) => {
  const secondsRemaining = getTokenSecondsRemaining(token);
  const maxAgeInSeconds =
    secondsRemaining > 0 ? secondsRemaining : fallbackMaxAgeInSeconds;

  await setCookie(name, token, maxAgeInSeconds);
};

export const isTokenExpiringSoon = (
  token: string,
  thresholdInSeconds: number = parseDurationToSecond("5m"),
) => {
  const secondsRemaining = getTokenSecondsRemaining(token);
  return secondsRemaining > 0 && secondsRemaining <= thresholdInSeconds;
};
