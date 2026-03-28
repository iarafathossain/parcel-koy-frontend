"use server";

import { catchError } from "@/helpers/catch-error";
import { adminServices } from "@/services/admin-service";

export const getAllAdminsAction = async (queryString: string) => {
  try {
    return await adminServices.getAllAdmins(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
