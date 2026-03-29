"use server";

import { catchError } from "@/helpers/catch-error";
import { merchantServices } from "@/services/merchant-service";

export const getAllMerchantParcelsAction = async (
  merchantId: string,
  queryString: string,
) => {
  try {
    return await merchantServices.getParcels(merchantId, queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
