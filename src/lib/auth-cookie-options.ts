export const isProduction = process.env.NODE_ENV === "production";

export const authCookieOptions = {
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  httpOnly: true,
  path: "/",
};
