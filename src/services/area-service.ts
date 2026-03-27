import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";

export const areaServices = {
  getAllAreas: async () => {
    try {
      const response = await httpClient.get(API.AREAS.BASE);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch areas");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
