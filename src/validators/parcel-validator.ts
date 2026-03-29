import * as zod from "zod";

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
