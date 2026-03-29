import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IMethod } from "@/types/method-type";

export const methodServices = {
  getAllPickupMethods: async () => {
    try {
      const response = await httpClient.get<IMethod[]>(
        API.METHODS.GET_ALL_PICKUP_METHODS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch pickup methods");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  getAllDeliveryMethods: async () => {
    try {
      const response = await httpClient.get<IMethod[]>(
        API.METHODS.GET_ALL_DELIVERY_METHODS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch delivery methods");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
