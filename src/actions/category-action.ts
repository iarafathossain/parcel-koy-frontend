"use server";

import { catchError } from "@/helpers/catch-error";
import { categoryServices } from "@/services/category-service";
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/validators/category-validator";

export const getAllCategoriesAction = async (queryString: string) => {
  try {
    return await categoryServices.getAllCategories(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createCategoryAction = async (payload: CreateCategoryPayload) => {
  try {
    return await categoryServices.createCategory(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateCategoryBySlugAction = async (
  slug: string,
  payload: UpdateCategoryPayload,
) => {
  try {
    return await categoryServices.updateCategoryBySlug(slug, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteCategoryBySlugAction = async (slug: string) => {
  try {
    return await categoryServices.deleteCategoryBySlug(slug);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
