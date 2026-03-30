import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IMethod } from "@/types/method-type";
import {
  CreateMethodPayload,
  UpdateMethodPayload,
} from "@/validators/method-validator";

export const methodServices = {
  getAllMethods: async (queryString: string) => {
    try {
      const response = await httpClient.get<IMethod[]>(
        queryString
          ? `${API.METHODS.GET_ALL_METHODS}?${queryString}`
          : API.METHODS.GET_ALL_METHODS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch methods");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  getAllPickupMethods: async () => {
    try {
      const response = await httpClient.get<IMethod[]>(
        API.METHODS.GET_ALL_PICKUP_METHODS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch pickup methods");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  getAllDeliveryMethods: async () => {
    try {
      const response = await httpClient.get<IMethod[]>(
        API.METHODS.GET_ALL_DELIVERY_METHODS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch delivery methods");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createMethod: async (payload: CreateMethodPayload) => {
    try {
      const response = await httpClient.post<IMethod>(
        API.METHODS.CREATE_A_METHOD,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create method");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateMethodBySlug: async (slug: string, payload: UpdateMethodPayload) => {
    try {
      const response = await httpClient.patch<IMethod>(
        API.METHODS.UPDATE_METHOD_BY_SLUG(slug),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update method");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deleteMethodBySlug: async (slug: string) => {
    try {
      const response = await httpClient.delete<IMethod>(
        API.METHODS.DELETE_METHOD_BY_SLUG(slug),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete method");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
