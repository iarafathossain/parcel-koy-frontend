import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IRider } from "@/types/user-type";

export const riderServices = {
  getAllRiders: async (queryString: string) => {
    try {
      const response = await httpClient.get<IRider[]>(
        queryString
          ? `${API.RIDERS.GET_ALL_RIDERS}?${queryString}`
          : API.RIDERS.GET_ALL_RIDERS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch riders");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  softDeleteRider: async (riderId: string) => {
    try {
      const response = await httpClient.patch(
        API.RIDERS.SOFT_DELETE(riderId),
        {},
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete rider");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
