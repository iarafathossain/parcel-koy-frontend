"use server";

import { catchError } from "@/helpers/catch-error";
import { riderServices } from "@/services/rider-service";
import { CreateRiderPayload } from "@/validators/rider-validator";

export const createRiderAction = async (payload: CreateRiderPayload) => {
  try {
    return await riderServices.createRider(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const getAllRidersAction = async (queryString: string) => {
  try {
    return await riderServices.getAllRiders(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const softDeleteRiderAction = async (riderId: string) => {
  try {
    return await riderServices.softDeleteRider(riderId);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
