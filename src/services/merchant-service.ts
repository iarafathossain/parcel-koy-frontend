import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IParcel } from "@/types/parcel-type";

export const merchantServices = {
  getParcels: async (merchantId: string, queryString: string) => {
    try {
      const response = await httpClient.get<IParcel[]>(
        queryString
          ? `${API.MERCHANTS.GET_ALL_PARCELS_BY_MERCHANT(merchantId)}?${queryString}`
          : API.MERCHANTS.GET_ALL_PARCELS_BY_MERCHANT(merchantId),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch parcels");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
