import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IHub } from "@/types/hub-type";

export const hubServices = {
  getAllHubs: async () => {
    try {
      const response = await httpClient.get<IHub[]>(API.HUBS.GET_ALL);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch hubs");
      }
      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
