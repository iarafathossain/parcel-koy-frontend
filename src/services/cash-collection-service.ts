import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { CollectCashPayload } from "@/validators/collect-cash-validator";

export const cashCollectionServices = {
  collectCashFromRider: async (
    riderId: string,
    payload: CollectCashPayload,
  ) => {
    try {
      const response = await httpClient.post<null>(
        API.CASH_COLLECTION.COLLECT_CASH_FROM_RIDER(riderId),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to collect cash");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
