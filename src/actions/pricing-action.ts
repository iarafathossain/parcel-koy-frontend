"use server";

import { catchError } from "@/helpers/catch-error";
import { pricingServices } from "@/services/pricing-service";
import {
  CreatePricingRulePayload,
  GetDeliveryChargePayload,
  UpdatePricingRulePayload,
} from "@/validators/pricing-validator";

export const getAllPricingAction = async (queryString: string) => {
  try {
    return await pricingServices.getAllPricing(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createPricingRuleAction = async (
  payload: CreatePricingRulePayload,
) => {
  try {
    return await pricingServices.createPricingRule(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updatePricingByIdAction = async (
  id: string,
  payload: UpdatePricingRulePayload,
) => {
  try {
    return await pricingServices.updatePricingById(id, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deletePricingByIdAction = async (id: string) => {
  try {
    return await pricingServices.deletePricingById(id);
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
