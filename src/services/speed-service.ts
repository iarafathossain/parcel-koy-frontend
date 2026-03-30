import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { ISpeed } from "@/types/speed-type";

export const speedServices = {
  getAllSpeeds: async () => {
    try {
      const response = await httpClient.get<ISpeed[]>(
        API.SPEEDS.GET_ALL_SPEEDS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch speeds");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
