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
    ACTIVE_USER: `${BASE_URL}/api/v1/auth/activate`,
    BLOCK_USER: `${BASE_URL}/api/v1/auth/block`,
  },

  USERS: {
    CREATE_ADMIN: `${BASE_URL}/api/v1/users/create-admin`,
    CREATE_RIDER: `${BASE_URL}/api/v1/users/create-rider`,
  },

  ADMINS: {
    GET_ALL: `${BASE_URL}/api/v1/admins`,
    UPDATE_PROFILE: `${BASE_URL}/api/v1/admins/profile`,
    SOFT_DELETE: (id: string) => `${BASE_URL}/api/v1/admins/${id}`,
    PERMANENT_DELETE: (id: string) =>
      `${BASE_URL}/api/v1/admins/${id}/permanent`,
  },

  ZONES: {
    BASE: `${BASE_URL}/api/v1/zones`,
    BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/zones/${slug}`,
  },

  AREAS: {
    GET_ALL_AREAS: `${BASE_URL}/api/v1/areas`,
  },

  HUBS: {
    GET_ALL: `${BASE_URL}/api/v1/hubs`,
  },

  CATEGORIES: {
    GET_ALL_CATEGORIES: `${BASE_URL}/api/v1/categories`,
  },

  SPEEDS: {
    GET_ALL_SPEEDS: `${BASE_URL}/api/v1/speeds`,
  },

  METHODS: {
    GET_ALL_METHODS: `${BASE_URL}/api/v1/methods`,
    GET_ALL_PICKUP_METHODS: `${BASE_URL}/api/v1/methods/?type=PICKUP`,
    GET_ALL_DELIVERY_METHODS: `${BASE_URL}/api/v1/methods/?type=DELIVERY`,
  },

  PRICING: {
    GET_ALL_PRICING: `${BASE_URL}/api/v1/pricing`,
    GET_DELIVERY_CHARGE: `${BASE_URL}/api/v1/pricing/delivery-charge`,
  },

  PARCELS: {
    CREATE_PARCEL: `${BASE_URL}/api/v1/parcels`,
  },

  NOTES: {
    GET_ALL_NOTES: `${BASE_URL}/api/v1/notes`,
    BY_ID: (id: string) => `${BASE_URL}/api/v1/notes/${id}`,
  },

  RIDERS: {
    BASE: `${BASE_URL}/api/v1/riders`,
    UPDATE_PROFILE: `${BASE_URL}/api/v1/riders/profile`,
    UPDATE_HUB: (id: string) => `${BASE_URL}/api/v1/riders/${id}/hub`,
    SOFT_DELETE: (id: string) => `${BASE_URL}/api/v1/riders/soft-delete/${id}`,
    CASH_HANDOVER: (riderId: string) =>
      `${BASE_URL}/api/v1/riders/my-cash-handovers?riderId=${riderId}`,
  },

  MERCHANTS: {
    GET_ALL_MERCHANTS: `${BASE_URL}/api/v1/merchants`,
    UPDATE_PROFILE: `${BASE_URL}/api/v1/merchants/profile`,
    SOFT_DELETE: (id: string) => `${BASE_URL}/api/v1/merchants/${id}`,
    GET_ALL_PARCELS_BY_MERCHANT: (merchantId: string) =>
      `${BASE_URL}/api/v1/merchants/${merchantId}/parcels`,
  },

  PAYOUTS: {
    REQUEST: `${BASE_URL}/api/v1/payouts/request`,
    PROCESS: (id: string) => `${BASE_URL}/api/v1/payouts/${id}/process`,
  },

  PAYMENT: {
    CONNECT_STRIPE_ONBOARD: `${BASE_URL}/api/v1/payment-accounts/stripe-connect/onboard`,
    STRIPE_VERIFY: `${BASE_URL}/api/v1/payment-accounts/stripe-connect/verify`,
    CLEAR_DUE: `${BASE_URL}/api/v1/payment-accounts/clear-due/checkout`,
  },

  CASH_COLLECTION: {
    COLLECT: (riderId: string) =>
      `${BASE_URL}/api/v1/cash-collections/collect/${riderId}`,
  },
  STATS: {
    GET_STATS: `${BASE_URL}/api/v1/stats`,
  },
};
