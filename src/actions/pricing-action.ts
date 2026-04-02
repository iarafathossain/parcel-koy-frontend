"use server";

import { catchError } from "@/helpers/catch-error";
import { pricingServices } from "@/services/pricing-service";
import { APIResponse } from "@/types/api-type";
import { IDeliveryCharge } from "@/types/pricing-type";
import {
  CreatePricingRulePayload,
  GetDeliveryChargePayload,
  UpdatePricingRulePayload,
} from "@/validators/pricing-validator";

export const getAllPricingAction = async (queryString = "") => {
  try {
    return await pricingServices.getAllPricing(queryString);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const createPricingRuleAction = async (
  payload: CreatePricingRulePayload,
) => {
  try {
    return await pricingServices.createPricingRule(payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const updatePricingByIdAction = async (
  id: string,
  payload: UpdatePricingRulePayload,
) => {
  try {
    return await pricingServices.updatePricingById(id, payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const deletePricingByIdAction = async (id: string) => {
  try {
    return await pricingServices.deletePricingById(id);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const getDeliveryChargeAction = async (
  payload: GetDeliveryChargePayload,
): Promise<APIResponse<IDeliveryCharge>> => {
  try {
    return await pricingServices.getDeliveryCharge(payload);
  } catch (error) {
    return {
      success: false,
      message: catchError(error),
      data: undefined,
    };
  }
};
