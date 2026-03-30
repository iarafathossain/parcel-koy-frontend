"use server";

import { catchError } from "@/helpers/catch-error";
import { pricingServices } from "@/services/pricing-service";
import { GetDeliveryChargePayload } from "@/validators/pricing-validator";

export const getAllPricingAction = async () => {
  try {
    return await pricingServices.getAllPricing();
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const getDeliveryChargeAction = async (
  payload: GetDeliveryChargePayload,
) => {
  try {
    return await pricingServices.getDeliveryCharge(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
