import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IParcel } from "@/types/parcel-type";
import { IRider } from "@/types/user-type";
import {
  CreateRiderPayload,
  UpdateParcelStatusByRiderPayload,
  VerifyAndDeliverParcelPayload,
} from "@/validators/rider-validator";

export const riderServices = {
  createRider: async (payload: CreateRiderPayload) => {
    try {
      const response = await httpClient.post(API.USERS.CREATE_RIDER, payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to create rider");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },

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
  getMyAssignedParcels: async (queryString: string) => {
    try {
      const response = await httpClient.get<IParcel[]>(
        queryString
          ? `${API.RIDERS.GET_MY_ASSIGNED_PARCELS}?${queryString}`
          : API.RIDERS.GET_MY_ASSIGNED_PARCELS,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch assigned parcels");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateParcelStatusByRider: async (
    parcelId: string,
    payload: UpdateParcelStatusByRiderPayload,
  ) => {
    try {
      const response = await httpClient.patch<IParcel>(
        API.RIDERS.UPDATE_PARCEL_STATUS_BY_RIDER(parcelId),
        payload,
      );
      if (!response.success)
        throw new Error(response.message || "Failed to update status");
      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  sendDeliveryOtp: async (parcelId: string) => {
    try {
      const response = await httpClient.post<{
        success: boolean;
        message: string;
      }>(API.RIDERS.SEND_DELIVERY_OTP(parcelId), {});
      if (!response.success)
        throw new Error(response.message || "Failed to send OTP");
      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  verifyDeliveryOtp: async (
    parcelId: string,
    payload: VerifyAndDeliverParcelPayload,
  ) => {
    try {
      const response = await httpClient.post<IParcel>(
        API.RIDERS.VERIFY_DELIVERY_OTP(parcelId),
        payload,
      );
      if (!response.success)
        throw new Error(response.message || "Failed to verify OTP");
      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
