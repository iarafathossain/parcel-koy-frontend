import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IAdmin } from "@/types/user-type";

export const adminServices = {
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
};
