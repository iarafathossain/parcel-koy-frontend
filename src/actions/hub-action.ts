"use server";

import { catchError } from "@/helpers/catch-error";
import { hubServices } from "@/services/hub-service";

export const getAllHubsAction = async () => {
  try {
    return await hubServices.getAllHubs();
  } catch (error) {
    throw new Error(catchError(error));
  }
};
