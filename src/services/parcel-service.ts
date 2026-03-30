import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IParcel } from "@/types/parcel-type";
import {
  CreateParcelPayload,
  UpdateParcelStatusByAdminPayload,
} from "@/validators/parcel-validator";

export const parcelServices = {
  getAllParcels: async (queryString: string) => {
    try {
      const response = await httpClient.get<IParcel[]>(
        queryString
          ? `${API.PARCELS.GET_ALL_PARCELS}?${queryString}`
          : API.PARCELS.GET_ALL_PARCELS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch parcels");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
  createParcel: async (payload: CreateParcelPayload) => {
    try {
      const response = await httpClient.post<IParcel>(
        API.PARCELS.CREATE_PARCEL,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create parcel request");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
  updateParcelStatusByAdmin: async (
    parcelId: string,
    payload: UpdateParcelStatusByAdminPayload,
  ) => {
    try {
      const response = await httpClient.patch<IParcel>(
        API.PARCELS.UPDATE_PARCEL_STATUS(parcelId),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update parcel status");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
