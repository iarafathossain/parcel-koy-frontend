"use server";

import { catchError } from "@/helpers/catch-error";
import { riderServices } from "@/services/rider-service";
import {
  CreateRiderPayload,
  GetSingleRiderByEmailPayload,
  UpdateParcelStatusByRiderPayload,
  VerifyAndDeliverParcelPayload,
} from "@/validators/rider-validator";

export const createRiderAction = async (payload: CreateRiderPayload) => {
  try {
    return await riderServices.createRider(payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const getAllRidersAction = async (queryString: string) => {
  try {
    return await riderServices.getAllRiders(queryString);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const getSingleRiderByEmailAction = async (
  payload: GetSingleRiderByEmailPayload,
) => {
  try {
    return await riderServices.getSingleRiderByEmail(payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const softDeleteRiderAction = async (riderId: string) => {
  try {
    return await riderServices.softDeleteRider(riderId);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const getMyAssignedParcelsAction = async (queryString: string) => {
  try {
    return await riderServices.getMyAssignedParcels(queryString);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const updateParcelStatusByRiderAction = async (
  parcelId: string,
  payload: UpdateParcelStatusByRiderPayload,
) => {
  try {
    console.log(
      "Calling updateParcelStatusByRiderAction with parcelId in action:",
      parcelId,
    );
    console.log("Payload in action:", payload);
    return await riderServices.updateParcelStatusByRider(parcelId, payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const sendDeliveryOtpAction = async (parcelId: string) => {
  try {
    return await riderServices.sendDeliveryOtp(parcelId);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const verifyDeliveryOtpAction = async (
  parcelId: string,
  payload: VerifyAndDeliverParcelPayload,
) => {
  try {
    return await riderServices.verifyDeliveryOtp(parcelId, payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};
