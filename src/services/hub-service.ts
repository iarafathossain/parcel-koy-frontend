import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IHub } from "@/types/hub-type";
import { CreateHubPayload, UpdateHubPayload } from "@/validators/hub-validator";

export const hubServices = {
  getAllHubs: async (queryString: string) => {
    try {
      const response = await httpClient.get<IHub[]>(
        queryString ? `${API.HUBS.GET_ALL}?${queryString}` : API.HUBS.GET_ALL,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch hubs");
      }
      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createHub: async (payload: CreateHubPayload) => {
    try {
      const response = await httpClient.post<IHub>(
        API.HUBS.CREATE_A_HUB,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create hub");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateHubBySlug: async (slug: string, payload: UpdateHubPayload) => {
    try {
      const response = await httpClient.patch<IHub>(
        API.HUBS.UPDATE_HUB_BY_SLUG(slug),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update hub");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deleteHubBySlug: async (slug: string) => {
    try {
      const response = await httpClient.delete<IHub>(
        API.HUBS.DELETE_HUB_BY_SLUG(slug),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete hub");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
