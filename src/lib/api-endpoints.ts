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
    GET_ALL_ZONES: `${BASE_URL}/api/v1/zones`,
    CREATE_A_ZONE: `${BASE_URL}/api/v1/zones`,
    UPDATE_ZONE_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/zones/${slug}`,
    DELETE_ZONE_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/zones/${slug}`,
  },

  AREAS: {
    GET_ALL_AREAS: `${BASE_URL}/api/v1/areas`,
    CREATE_A_AREA: `${BASE_URL}/api/v1/areas`,
    UPDATE_AREA_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/areas/${slug}`,
    DELETE_AREA_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/areas/${slug}`,
  },

  HUBS: {
    GET_ALL: `${BASE_URL}/api/v1/hubs`,
    CREATE_A_HUB: `${BASE_URL}/api/v1/hubs`,
    UPDATE_HUB_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/hubs/${slug}`,
    DELETE_HUB_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/hubs/${slug}`,
  },

  CATEGORIES: {
    GET_ALL_CATEGORIES: `${BASE_URL}/api/v1/categories`,
    CREATE_A_CATEGORY: `${BASE_URL}/api/v1/categories`,
    UPDATE_CATEGORY_BY_SLUG: (slug: string) =>
      `${BASE_URL}/api/v1/categories/${slug}`,
    DELETE_CATEGORY_BY_SLUG: (slug: string) =>
      `${BASE_URL}/api/v1/categories/${slug}`,
  },

  SPEEDS: {
    GET_ALL_SPEEDS: `${BASE_URL}/api/v1/speeds`,
    CREATE_A_SPEED: `${BASE_URL}/api/v1/speeds`,
    UPDATE_SPEED_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/speeds/${slug}`,
    DELETE_SPEED_BY_SLUG: (slug: string) => `${BASE_URL}/api/v1/speeds/${slug}`,
  },

  METHODS: {
    GET_ALL_METHODS: `${BASE_URL}/api/v1/methods`,
    CREATE_A_METHOD: `${BASE_URL}/api/v1/methods`,
    UPDATE_METHOD_BY_SLUG: (slug: string) =>
      `${BASE_URL}/api/v1/methods/${slug}`,
    DELETE_METHOD_BY_SLUG: (slug: string) =>
      `${BASE_URL}/api/v1/methods/${slug}`,

    GET_ALL_PICKUP_METHODS: `${BASE_URL}/api/v1/methods/?type=PICKUP`,
    GET_ALL_DELIVERY_METHODS: `${BASE_URL}/api/v1/methods/?type=DELIVERY`,
  },

  PRICING: {
    // method=GET
    GET_ALL_PRICING: `${BASE_URL}/api/v1/pricing`,
    // method=POST
    CREATE_A_PRICING: `${BASE_URL}/api/v1/pricing`,
    // method=PATCH
    UPDATE_PRICING_BY_ID: (id: string) => `${BASE_URL}/api/v1/pricing/${id}`,
    // method=DELETE
    DELETE_PRICING_BY_ID: (id: string) => `${BASE_URL}/api/v1/pricing/${id}`,
    // method=POST
    GET_DELIVERY_CHARGE: `${BASE_URL}/api/v1/pricing/delivery-charge`,
  },

  PARCELS: {
    CREATE_PARCEL: `${BASE_URL}/api/v1/parcels`,
    GET_ALL_PARCELS: `${BASE_URL}/api/v1/parcels`,
    UPDATE_PARCEL_STATUS: (id: string) =>
      `${BASE_URL}/api/v1/parcels/status/${id}`,
  },

  NOTES: {
    GET_ALL_NOTES: `${BASE_URL}/api/v1/notes`,
    BY_ID: (id: string) => `${BASE_URL}/api/v1/notes/${id}`,
  },

  RIDERS: {
    GET_ALL_RIDERS: `${BASE_URL}/api/v1/riders`,
    UPDATE_PROFILE: `${BASE_URL}/api/v1/riders/profile`,
    SOFT_DELETE: (id: string) => `${BASE_URL}/api/v1/riders/${id}`,
    GET_ALL_PARCELS_BY_RIDER: (riderId: string) =>
      `${BASE_URL}/api/v1/riders/${riderId}/parcels`,
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
