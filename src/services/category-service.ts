import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { ICategory } from "@/types/category-type";

export const categoryServices = {
  getAllCategories: async () => {
    try {
      const response = await httpClient.get<ICategory[]>(
        API.CATEGORIES.GET_ALL_CATEGORIES,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
