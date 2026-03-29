import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IUser } from "@/types/user-type";
import { UpdateAdminProfilePayload } from "@/validators/admin-validator";
import { UpdateMerchantProfilePayload } from "@/validators/merchant-validator";
import { UpdateRiderProfilePayload } from "@/validators/rider-validator";
import { cookies } from "next/headers";

export const userServices = {
  getUserInfo: async () => {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("access_token")?.value;
      const sessionToken = cookieStore.get("better-auth.session_token")?.value;

      if (!accessToken || !sessionToken) {
        return null;
      }

      const response = await fetch(API.AUTH.ME, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}; better-auth.session_token=${sessionToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();

      return data as IUser;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  },
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
