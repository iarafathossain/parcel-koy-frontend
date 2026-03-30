import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IArea } from "@/types/area-type";
import {
  CreateAreaPayload,
  UpdateAreaPayload,
} from "@/validators/area-validator";

export const areaServices = {
  getAllAreas: async (queryString: string) => {
    try {
      const response = await httpClient.get<IArea[]>(
        queryString
          ? `${API.AREAS.GET_ALL_AREAS}?${queryString}`
          : API.AREAS.GET_ALL_AREAS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch areas");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createArea: async (payload: CreateAreaPayload) => {
    try {
      const response = await httpClient.post<IArea>(
        API.AREAS.CREATE_A_AREA,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create area");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateAreaBySlug: async (slug: string, payload: UpdateAreaPayload) => {
    try {
      const response = await httpClient.patch<IArea>(
        API.AREAS.UPDATE_AREA_BY_SLUG(slug),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update area");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deleteAreaBySlug: async (slug: string) => {
    try {
      const response = await httpClient.delete<IArea>(
        API.AREAS.DELETE_AREA_BY_SLUG(slug),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete area");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
