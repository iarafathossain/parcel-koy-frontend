import { ParcelStatus, ParcelStatusType } from "@/types/enum-type";
import * as zod from "zod";

export const ALLOWED_TRANSITIONS = {
  [ParcelStatus.REQUESTED]: [
    ParcelStatus.PICKUP_RIDER_ASSIGNED,
    ParcelStatus.CANCELLED,
  ],
  [ParcelStatus.PICKUP_RIDER_ASSIGNED]: [
    ParcelStatus.PICKED_UP,
    ParcelStatus.PICKUP_FAILED,
    ParcelStatus.CANCELLED,
  ],
  [ParcelStatus.PICKED_UP]: [ParcelStatus.RECEIVED_AT_ORIGIN_HUB],
  [ParcelStatus.RECEIVED_AT_ORIGIN_HUB]: [ParcelStatus.IN_TRANSIT],
  [ParcelStatus.IN_TRANSIT]: [
    ParcelStatus.RECEIVED_AT_DESTINATION_HUB,
    ParcelStatus.ON_HOLD,
  ],
  [ParcelStatus.ON_HOLD]: [ParcelStatus.IN_TRANSIT],
  [ParcelStatus.RECEIVED_AT_DESTINATION_HUB]: [ParcelStatus.OUT_FOR_DELIVERY],
  [ParcelStatus.OUT_FOR_DELIVERY]: [
    ParcelStatus.DELIVERED,
    ParcelStatus.PARTIAL_DELIVERY,
    ParcelStatus.DELIVERY_FAILED,
  ],
  [ParcelStatus.DELIVERY_FAILED]: [
    ParcelStatus.OUT_FOR_DELIVERY,
    ParcelStatus.RETURNED_TO_MERCHANT,
  ],
  [ParcelStatus.DELIVERED]: [],
  [ParcelStatus.CANCELLED]: [],
  [ParcelStatus.RETURNED_TO_MERCHANT]: [],
  [ParcelStatus.PICKUP_FAILED]: [],
  [ParcelStatus.PARTIAL_DELIVERY]: [],
} as const satisfies Record<ParcelStatusType, readonly ParcelStatusType[]>;

export const createParcelZodSchema = zod.object({
  categoryId: zod.string().uuid("Invalid Category ID"),
  destinationAreaId: zod.string().uuid("Invalid Area ID"),
  originAreaId: zod.string().uuid("Invalid Area ID").optional(),
  speedId: zod.string().uuid("Invalid Speed ID"),
  pickupMethodId: zod.string().uuid("Invalid Pickup Method ID"),
  deliveryMethodId: zod.string().uuid("Invalid Delivery Method ID"),
  declaredWeight: zod
    .number()
    .positive("Declared weight must be a positive number"),
  isFragile: zod.boolean().optional(),
  pickupAddress: zod.string().min(1, "Pickup address is required").optional(),
  deliveryAddress: zod.string().min(1, "Delivery address is required"),
  receiverName: zod.string().min(1, "Receiver name is required"),
  receiverContactNumber: zod
    .string()
    .min(1, "Receiver contact number is required"),
  codAmount: zod.number().nonnegative("COD amount must be non-negative"),
});

export type CreateParcelPayload = zod.infer<typeof createParcelZodSchema>;

export const updateParcelStatusByAdminZodSchema = zod.object({
  status: zod.enum(
    [
      ParcelStatus.PICKED_UP,
      ParcelStatus.IN_TRANSIT,
      ParcelStatus.OUT_FOR_DELIVERY,
      ParcelStatus.DELIVERED,
      ParcelStatus.PICKUP_FAILED,
      ParcelStatus.DELIVERY_FAILED,
      ParcelStatus.CANCELLED,
      ParcelStatus.ON_HOLD,
      ParcelStatus.PARTIAL_DELIVERY,
      ParcelStatus.PICKUP_RIDER_ASSIGNED,
      ParcelStatus.RECEIVED_AT_DESTINATION_HUB,
      ParcelStatus.RECEIVED_AT_ORIGIN_HUB,
      ParcelStatus.REQUESTED,
      ParcelStatus.RETURNED_TO_MERCHANT,
    ],
    "Invalid parcel status selected",
  ),
  pickupRiderId: zod.string().uuid("Invalid Pickup Rider ID").optional(),
  deliveryRiderId: zod.string().uuid("Invalid Delivery Rider ID").optional(),
});

export type UpdateParcelStatusByAdminPayload = zod.infer<
  typeof updateParcelStatusByAdminZodSchema
>;

export const updateParcelZodSchema = zod.object({
  categoryId: zod.string().uuid("Invalid Category ID").optional(),
  destinationAreaId: zod.string().uuid("Invalid Area ID").optional(),
  originAreaId: zod.string().uuid("Invalid Area ID").optional(),
  speedId: zod.string().uuid("Invalid Speed ID").optional(),
  pickupMethodId: zod.string().uuid("Invalid Pickup Method ID").optional(),
  deliveryMethodId: zod.string().uuid("Invalid Delivery Method ID").optional(),
  declaredWeight: zod
    .number()
    .positive("Declared weight must be a positive number")
    .optional(),
  isFragile: zod.boolean().optional(),
  pickupAddress: zod.string().min(1, "Pickup address is required").optional(),
  deliveryAddress: zod
    .string()
    .min(1, "Delivery address is required")
    .optional(),
  receiverName: zod.string().min(1, "Receiver name is required").optional(),
  receiverContactNumber: zod
    .string()
    .min(1, "Receiver contact number is required")
    .optional(),
  deliveryCharge: zod
    .number()
    .nonnegative("Delivery charge must be non-negative")
    .optional(),
});

export type UpdateParcelPayload = zod.infer<typeof updateParcelZodSchema>;

export const cancelParcelByMerchantZodSchema = zod.object({
  cancellationReason: zod
    .string()
    .min(1, "Cancellation reason is required")
    .optional(),
});

export type CancelParcelByMerchantPayload = zod.infer<
  typeof cancelParcelByMerchantZodSchema
>;
