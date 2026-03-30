import * as zod from "zod";

export const getDeliveryChargeZodSchema = zod.object({
  destinationAreaId: zod.string().uuid("Invalid Area ID"),
  originAreaId: zod.string().uuid("Invalid Area ID").optional(),
  categoryId: zod.string().uuid("Category ID must be a valid UUID"),
  speedId: zod.string().uuid("Speed ID must be a valid UUID"),
  pickupMethodId: zod.string().uuid("Pickup method ID must be a valid UUID"),
  deliveryMethodId: zod
    .string()
    .uuid("Delivery method ID must be a valid UUID"),
  weight: zod
    .number("Weight must be a number")
    .min(0, "Weight must be greater than or equal to 0"),
});

export type GetDeliveryChargePayload = zod.infer<
  typeof getDeliveryChargeZodSchema
>;
