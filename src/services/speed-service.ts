import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { ISpeed } from "@/types/speed-type";
import {
  CreateSpeedPayload,
  UpdateSpeedPayload,
} from "@/validators/speed-validator";

export const speedServices = {
  getAllSpeeds: async (queryString: string) => {
    try {
      const response = await httpClient.get<ISpeed[]>(
        queryString
          ? `${API.SPEEDS.GET_ALL_SPEEDS}?${queryString}`
          : API.SPEEDS.GET_ALL_SPEEDS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch speeds");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createSpeed: async (payload: CreateSpeedPayload) => {
    try {
      const response = await httpClient.post<ISpeed>(
        API.SPEEDS.CREATE_A_SPEED,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create speed");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateSpeedBySlug: async (slug: string, payload: UpdateSpeedPayload) => {
    try {
      const response = await httpClient.patch<ISpeed>(
        API.SPEEDS.UPDATE_SPEED_BY_SLUG(slug),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update speed");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deleteSpeedBySlug: async (slug: string) => {
    try {
      const response = await httpClient.delete<ISpeed>(
        API.SPEEDS.DELETE_SPEED_BY_SLUG(slug),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete speed");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
