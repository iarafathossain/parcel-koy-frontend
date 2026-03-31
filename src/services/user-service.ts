import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { UpdateAdminProfilePayload } from "@/validators/admin-validator";
import { UpdateMerchantProfilePayload } from "@/validators/merchant-validator";
import { UpdateRiderProfilePayload } from "@/validators/rider-validator";

export const userServices = {
  updateAdminProfile: async (payload: UpdateAdminProfilePayload) => {
    try {
      const response = await httpClient.patch(
        API.ADMINS.UPDATE_PROFILE,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update admin profile");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  updateMerchantProfile: async (payload: UpdateMerchantProfilePayload) => {
    try {
      const response = await httpClient.patch(
        API.MERCHANTS.UPDATE_PROFILE,
        payload,
      );

      if (!response.success) {
        throw new Error(
          response.message || "Failed to update merchant profile",
        );
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  updateRiderProfile: async (payload: UpdateRiderProfilePayload) => {
    try {
      const response = await httpClient.patch(
        API.RIDERS.UPDATE_PROFILE,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update rider profile");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
