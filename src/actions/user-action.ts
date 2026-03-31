"use server";

import { catchError } from "@/helpers/catch-error";
import { userServices } from "@/services/user-service";
import { UpdateAdminProfilePayload } from "@/validators/admin-validator";
import { UpdateMerchantProfilePayload } from "@/validators/merchant-validator";
import { UpdateRiderProfilePayload } from "@/validators/rider-validator";

export const updateAdminProfileAction = async (
  payload: UpdateAdminProfilePayload,
) => {
  try {
    return await userServices.updateAdminProfile(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateMerchantProfileAction = async (
  payload: UpdateMerchantProfilePayload,
) => {
  try {
    return await userServices.updateMerchantProfile(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateRiderProfileAction = async (
  payload: UpdateRiderProfilePayload,
) => {
  try {
    return await userServices.updateRiderProfile(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
