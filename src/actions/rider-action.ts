"use server";

import { catchError } from "@/helpers/catch-error";
import { riderServices } from "@/services/rider-service";
import {
  CreateRiderPayload,
  UpdateParcelStatusByRiderPayload,
  VerifyAndDeliverParcelPayload,
} from "@/validators/rider-validator";

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

export const getMyAssignedParcelsAction = async (queryString: string) => {
  try {
    return await riderServices.getMyAssignedParcels(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateParcelStatusByRiderAction = async (
  parcelId: string,
  payload: UpdateParcelStatusByRiderPayload,
) => {
  try {
    return await riderServices.updateParcelStatusByRider(parcelId, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const sendDeliveryOtpAction = async (parcelId: string) => {
  try {
    return await riderServices.sendDeliveryOtp(parcelId);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const verifyDeliveryOtpAction = async (
  parcelId: string,
  payload: VerifyAndDeliverParcelPayload,
) => {
  try {
    return await riderServices.verifyDeliveryOtp(parcelId, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
