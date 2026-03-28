import { env } from "@/env";

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  AUTH: {
    REGISTER: `${BASE_URL}/api/v1/auth/register/`,
    LOGIN: `${BASE_URL}/api/v1/auth/login/`,
    VERIFY_EMAIL: `${BASE_URL}/api/v1/auth/verify-email/`,
    ME: `${BASE_URL}/api/v1/auth/me/`,
    LOGOUT: `${BASE_URL}/api/v1/auth/logout/`,
    FORGOT_PASSWORD: `${BASE_URL}/api/v1/auth/forget-password/`,
    RESET_PASSWORD: `${BASE_URL}/api/v1/auth/reset-password/`,
    CHANGE_PASSWORD: `${BASE_URL}/api/v1/auth/change-password/`,
    REFRESH_TOKENS: `${BASE_URL}/api/v1/auth/refresh-tokens/`,
  },

  USERS: {
    CREATE_ADMIN: `${BASE_URL}/api/v1/users/create-admin`,
    CREATE_RIDER: `${BASE_URL}/api/v1/users/create-rider`,
  },

  ADMINS: {
    GET_ALL: `${BASE_URL}/api/v1/admins`,
  },

  ZONES: {
    BASE: `${BASE_URL}/api/v1/zones`,
    BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/zones/${slug}`,
  },

  AREAS: {
    BASE: `${BASE_URL}/api/v1/areas`,
    BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/areas/${slug}`,
  },

  HUBS: {
    GET_ALL: `${BASE_URL}/api/v1/hubs`,
  },

  CATEGORIES: {
    BASE: `${BASE_URL}/api/v1/categories`,
    BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/categories/${slug}`,
  },

  SERVICES: {
    BASE: `${BASE_URL}/api/v1/services`,
    BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/services/${slug}`,
  },

  METHODS: {
    BASE: `${BASE_URL}/api/v1/methods`,
    BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/methods/${slug}`,
  },

  PRICING: {
    BASE: `${BASE_URL}/api/v1/pricing`,
    RULES: `${BASE_URL}/api/v1/pricing-rules`,
    BY_ID: (id: string) => `${BASE_URL}/api/v1/pricing-rules/${id}`,
  },

  PARCELS: {
    BASE: `${BASE_URL}/api/v1/parcels`,
    BY_ID: (id: string) => `${BASE_URL}/api/v1/parcels/${id}`,
    STATUS: (id: string) => `${BASE_URL}/api/v1/parcels/status/${id}`,
    RIDER_STATUS: (id: string) =>
      `${BASE_URL}/api/v1/parcels/rider-status/${id}`,
    TRACK: (trackingId: string) =>
      `${BASE_URL}/api/v1/parcels/tracking/${trackingId}`,
    CANCEL: (id: string) => `${BASE_URL}/api/v1/parcels/cancel/${id}`,
    DELIVERY_OTP: (id: string) =>
      `${BASE_URL}/api/v1/parcels/delivery-otp/${id}`,
    VERIFY_DELIVERY: (id: string) =>
      `${BASE_URL}/api/v1/parcels/verify-delivery/${id}`,
  },

  NOTES: {
    BASE: `${BASE_URL}/api/v1/notes`,
    BY_ID: (id: string) => `${BASE_URL}/api/v1/notes/${id}`,
  },

  RIDERS: {
    BASE: `${BASE_URL}/api/v1/riders`,
    PROFILE: `${BASE_URL}/api/v1/riders/profile`,
    UPDATE_HUB: (id: string) => `${BASE_URL}/api/v1/riders/${id}/hub`,
    SOFT_DELETE: (id: string) => `${BASE_URL}/api/v1/riders/soft-delete/${id}`,
    CASH_HANDOVER: (riderId: string) =>
      `${BASE_URL}/api/v1/riders/my-cash-handovers?riderId=${riderId}`,
  },

  MERCHANTS: {
    PROFILE: `${BASE_URL}/api/v1/merchants/profile`,
  },

  PAYOUTS: {
    REQUEST: `${BASE_URL}/api/v1/payouts/request`,
    PROCESS: (id: string) => `${BASE_URL}/api/v1/payouts/${id}/process`,
  },

  PAYMENT: {
    STRIPE_ONBOARD: `${BASE_URL}/api/v1/payment-accounts/stripe-connect/onboard`,
    STRIPE_VERIFY: `${BASE_URL}/api/v1/payment-accounts/stripe-connect/verify`,
    CLEAR_DUE: `${BASE_URL}/api/v1/payment-accounts/clear-due/checkout`,
  },

  CASH_COLLECTION: {
    COLLECT: (riderId: string) =>
      `${BASE_URL}/api/v1/cash-collections/collect/${riderId}`,
  },
};
