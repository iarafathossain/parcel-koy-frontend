import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IDeliveryCharge } from "@/types/pricing-type";
import { GetDeliveryChargePayload } from "@/validators/pricing-validator";

export const pricingServices = {
  getAllPricing: async () => {
    try {
      const response = await httpClient.get(API.PRICING.GET_ALL_PRICING);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch pricing");
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

      console.log("Delivery Charge Response:", response); // Debug log

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch delivery charge");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
