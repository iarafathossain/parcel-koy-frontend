"use server";

import { catchError } from "@/helpers/catch-error";
import { merchantServices } from "@/services/merchant-service";

export const getAllMerchantsAction = async (queryString: string) => {
  try {
    return await merchantServices.getAllMerchants(queryString);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const softDeleteMerchantAction = async (merchantId: string) => {
  try {
    return await merchantServices.softDeleteMerchant(merchantId);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const getAllMerchantParcelsAction = async (
  merchantId: string,
  queryString: string,
) => {
  try {
    return await merchantServices.getParcels(merchantId, queryString);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};
