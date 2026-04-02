"use server";

import { catchError } from "@/helpers/catch-error";
import { parcelServices } from "@/services/parcel-service";
import {
  CancelParcelByMerchantPayload,
  cancelParcelByMerchantZodSchema,
  CreateParcelPayload,
  UpdateParcelPayload,
  UpdateParcelStatusByAdminPayload,
  updateParcelZodSchema,
} from "@/validators/parcel-validator";

export const getAllParcelsAction = async (queryString: string) => {
  try {
    return await parcelServices.getAllParcels(queryString);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const createParcelAction = async (payload: CreateParcelPayload) => {
  try {
    return await parcelServices.createParcel(payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const updateParcelStatusByAdminAction = async (
  parcelId: string,
  payload: UpdateParcelStatusByAdminPayload,
) => {
  try {
    return await parcelServices.updateParcelStatusByAdmin(parcelId, payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const updateParcelByIdAction = async (
  parcelId: string,
  payload: UpdateParcelPayload,
) => {
  try {
    const parsedPayload = updateParcelZodSchema.parse(payload);
    return await parcelServices.updateParcelById(parcelId, parsedPayload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const cancelParcelByMerchantAction = async (
  parcelId: string,
  payload: CancelParcelByMerchantPayload,
) => {
  try {
    const parsedPayload = cancelParcelByMerchantZodSchema.parse(payload);
    return await parcelServices.cancelParcelByMerchant(parcelId, parsedPayload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};
