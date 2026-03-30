"use server";

import { catchError } from "@/helpers/catch-error";
import { speedServices } from "@/services/speed-service";

export const getAllSpeedsAction = async () => {
  try {
    return await speedServices.getAllSpeeds();
  } catch (error) {
    throw new Error(catchError(error));
  }
};
