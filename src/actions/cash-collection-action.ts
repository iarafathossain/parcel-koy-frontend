"use server";

import { catchError } from "@/helpers/catch-error";
import { cashCollectionServices } from "@/services/cash-collection-service";
import { CollectCashPayload } from "@/validators/collect-cash-validator";

export const collectCashFromRiderAction = async (
  riderId: string,
  payload: CollectCashPayload,
) => {
  try {
    return await cashCollectionServices.collectCashFromRider(riderId, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
