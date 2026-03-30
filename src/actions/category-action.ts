"use server";

import { catchError } from "@/helpers/catch-error";
import { categoryServices } from "@/services/category-service";

export const getAllCategoriesAction = async () => {
  try {
    return await categoryServices.getAllCategories();
  } catch (error) {
    throw new Error(catchError(error));
  }
};
