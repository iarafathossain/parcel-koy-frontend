"use server";

import { catchError } from "@/helpers/catch-error";
import { parcelServices } from "@/services/parcel-service";
import {
  CreateParcelPayload,
  UpdateParcelStatusByAdminPayload,
} from "@/validators/parcel-validator";

export const getAllParcelsAction = async (queryString: string) => {
  try {
    return await parcelServices.getAllParcels(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createParcelAction = async (payload: CreateParcelPayload) => {
  try {
    return await parcelServices.createParcel(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateParcelStatusByAdminAction = async (
  parcelId: string,
  payload: UpdateParcelStatusByAdminPayload,
) => {
  try {
    return await parcelServices.updateParcelStatusByAdmin(parcelId, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
