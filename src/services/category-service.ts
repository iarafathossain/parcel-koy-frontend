import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { ICategory } from "@/types/category-type";
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/validators/category-validator";

export const categoryServices = {
  getAllCategories: async (queryString: string) => {
    try {
      const response = await httpClient.get<ICategory[]>(
        queryString
          ? `${API.CATEGORIES.GET_ALL_CATEGORIES}?${queryString}`
          : API.CATEGORIES.GET_ALL_CATEGORIES,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  createCategory: async (payload: CreateCategoryPayload) => {
    try {
      const response = await httpClient.post<ICategory>(
        API.CATEGORIES.CREATE_A_CATEGORY,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create category");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  updateCategoryBySlug: async (
    slug: string,
    payload: UpdateCategoryPayload,
  ) => {
    try {
      const response = await httpClient.patch<ICategory>(
        API.CATEGORIES.UPDATE_CATEGORY_BY_SLUG(slug),
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update category");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },

  deleteCategoryBySlug: async (slug: string) => {
    try {
      const response = await httpClient.delete<ICategory>(
        API.CATEGORIES.DELETE_CATEGORY_BY_SLUG(slug),
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to delete category");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
