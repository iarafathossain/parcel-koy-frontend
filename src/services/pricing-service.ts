import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IDeliveryCharge, IPricingRule } from "@/types/pricing-type";
import {
  CreatePricingRulePayload,
  GetDeliveryChargePayload,
  UpdatePricingRulePayload,
} from "@/validators/pricing-validator";

export const pricingServices = {
  getAllPricing: async (queryString = "") => {
    try {
      const response = await httpClient.get<IPricingRule[]>(
        queryString
          ? `${API.PRICING.GET_ALL_PRICING}?${queryString}`
          : API.PRICING.GET_ALL_PRICING,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch pricing");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createPricingRule: async (payload: CreatePricingRulePayload) => {
    try {
      const response = await httpClient.post<IPricingRule>(
        API.PRICING.CREATE_A_PRICING,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create pricing rule");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updatePricingById: async (id: string, payload: UpdatePricingRulePayload) => {
    try {
      const response = await httpClient.patch<IPricingRule>(
        API.PRICING.UPDATE_PRICING_BY_ID(id),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update pricing rule");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deletePricingById: async (id: string) => {
    try {
      const response = await httpClient.delete<IPricingRule>(
        API.PRICING.DELETE_PRICING_BY_ID(id),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete pricing rule");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  getDeliveryCharge: async (payload: GetDeliveryChargePayload) => {
    try {
      const response = await httpClient.post<IDeliveryCharge>(
        API.PRICING.GET_DELIVERY_CHARGE,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch delivery charge");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
