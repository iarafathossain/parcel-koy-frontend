import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IAdmin } from "@/types/user-type";
import { CreateAdminPayload } from "@/validators/admin-validator";
import {
  IActivateUserPayload,
  IBlockUserPayload,
} from "@/validators/auth-validators";

export const adminServices = {
  createAdmin: async (payload: CreateAdminPayload) => {
    try {
      const response = await httpClient.post(API.USERS.CREATE_ADMIN, payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to create admin");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },

  getAllAdmins: async (queryString: string) => {
    try {
      const response = await httpClient.get<IAdmin[]>(
        queryString
          ? `${API.ADMINS.GET_ALL}?${queryString}`
          : API.ADMINS.GET_ALL,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch admins");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  softDeleteAdmin: async (adminId: string) => {
    try {
      const response = await httpClient.delete(API.ADMINS.SOFT_DELETE(adminId));

      if (!response.success) {
        throw new Error(response.message || "Failed to soft delete admin");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  permanentDeleteAdmin: async (adminId: string) => {
    try {
      const response = await httpClient.delete(
        API.ADMINS.PERMANENT_DELETE(adminId),
      );

      if (!response.success) {
        throw new Error(
          response.message || "Failed to permanently delete admin",
        );
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  activateUser: async (payload: IActivateUserPayload) => {
    try {
      const response = await httpClient.post(API.AUTH.ACTIVE_USER, payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to activate user");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
  blockUser: async (payload: IBlockUserPayload) => {
    try {
      const response = await httpClient.post(API.AUTH.BLOCK_USER, payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to block user");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
