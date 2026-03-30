import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IZone } from "@/types/zone-type";
import {
  CreateZonePayload,
  UpdateZonePayload,
} from "@/validators/zone-validator";

export const zoneServices = {
  getAllZones: async (queryString: string) => {
    try {
      const response = await httpClient.get<IZone[]>(
        queryString
          ? `${API.ZONES.GET_ALL_ZONES}?${queryString}`
          : API.ZONES.GET_ALL_ZONES,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch zones");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createZone: async (payload: CreateZonePayload) => {
    try {
      const response = await httpClient.post<IZone>(
        API.ZONES.CREATE_A_ZONE,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create zone");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateZoneBySlug: async (slug: string, payload: UpdateZonePayload) => {
    try {
      const response = await httpClient.patch<IZone>(
        API.ZONES.UPDATE_ZONE_BY_SLUG(slug),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update zone");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deleteZoneBySlug: async (slug: string) => {
    try {
      const response = await httpClient.delete<IZone>(
        API.ZONES.DELETE_ZONE_BY_SLUG(slug),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete zone");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
