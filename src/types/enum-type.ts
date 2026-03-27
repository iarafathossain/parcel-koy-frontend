export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;
export type GenderType = (typeof Gender)[keyof typeof Gender];

export const Role = {
  MERCHANT: "MERCHANT",
  RIDER: "RIDER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;
export type RoleType = (typeof Role)[keyof typeof Role];

export const ParcelStatus = {
  REQUESTED: "REQUESTED",
  PICKUP_RIDER_ASSIGNED: "PICKUP_RIDER_ASSIGNED",
  PICKED_UP: "PICKED_UP",
  PICKUP_FAILED: "PICKUP_FAILED",
  RECEIVED_AT_ORIGIN_HUB: "RECEIVED_AT_ORIGIN_HUB",
  IN_TRANSIT: "IN_TRANSIT",
  RECEIVED_AT_DESTINATION_HUB: "RECEIVED_AT_DESTINATION_HUB",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  PARTIAL_DELIVERY: "PARTIAL_DELIVERY",
  DELIVERY_FAILED: "DELIVERY_FAILED",
  ON_HOLD: "ON_HOLD",
  RETURNED_TO_MERCHANT: "RETURNED_TO_MERCHANT",
  CANCELLED: "CANCELLED",
} as const;
export type ParcelStatusType = (typeof ParcelStatus)[keyof typeof ParcelStatus];

export const UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED",
} as const;
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

export const PayoutStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
} as const;
export type PayoutStatusType = (typeof PayoutStatus)[keyof typeof PayoutStatus];

export const MethodType = {
  PICKUP: "PICKUP",
  DELIVERY: "DELIVERY",
} as const;
export type MethodTypeUnion = (typeof MethodType)[keyof typeof MethodType];

export const PaymentProviderType = {
  BANK: "BANK",
  BKASH: "BKASH",
  NAGAD: "NAGAD",
  ROCKET: "ROCKET",
  STRIPE: "STRIPE",
} as const;
export type PaymentProviderTypeUnion =
  (typeof PaymentProviderType)[keyof typeof PaymentProviderType];
