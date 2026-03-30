"use server";

import { catchError } from "@/helpers/catch-error";
import { parcelServices } from "@/services/parcel-service";
import { CreateParcelPayload } from "@/validators/parcel-validator";

export const createParcelAction = async (payload: CreateParcelPayload) => {
  try {
    return await parcelServices.createParcel(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
