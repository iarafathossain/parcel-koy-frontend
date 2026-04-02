import * as zod from "zod";

export const createStripeCheckoutSessionZodSchema = zod.object({
  successUrl: zod.url("successUrl must be a valid URL").optional(),
  cancelUrl: zod.url("cancelUrl must be a valid URL").optional(),
});

export const requestPayoutZodSchema = zod.object({
  amount: zod.number().positive("Amount must be greater than zero"),
});

export const processPayoutZodSchema = zod.object({
  payoutId: zod.string().trim().min(1, "Payout ID is required"),
});

export type CreateStripeCheckoutSessionPayload = zod.infer<
  typeof createStripeCheckoutSessionZodSchema
>;

export type RequestPayoutPayload = zod.infer<typeof requestPayoutZodSchema>;
export type ProcessPayoutPayload = zod.infer<typeof processPayoutZodSchema>;
