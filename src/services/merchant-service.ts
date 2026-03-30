import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IParcel } from "@/types/parcel-type";
import { IMerchant } from "@/types/user-type";

export const merchantServices = {
  getAllMerchants: async (queryString: string) => {
    try {
      const response = await httpClient.get<IMerchant[]>(
        queryString
          ? `${API.MERCHANTS.GET_ALL_MERCHANTS}?${queryString}`
          : API.MERCHANTS.GET_ALL_MERCHANTS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch merchants");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  softDeleteMerchant: async (merchantId: string) => {
    try {
      const response = await httpClient.delete(
        API.MERCHANTS.SOFT_DELETE(merchantId),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete merchant");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
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
