import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.url(),
  },
  server: {
    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    OTP_EXPIRES_IN: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    CLEAR_DUE_PAYMENT_SUCCESS_URL: z.url(),
    CLEAR_DUE_PAYMENT_CANCEL_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    CLEAR_DUE_PAYMENT_SUCCESS_URL: process.env.CLEAR_DUE_PAYMENT_SUCCESS_URL,
    CLEAR_DUE_PAYMENT_CANCEL_URL: process.env.CLEAR_DUE_PAYMENT_CANCEL_URL,
  },
});
