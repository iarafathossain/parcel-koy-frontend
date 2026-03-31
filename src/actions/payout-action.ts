"use server";

import { catchError } from "@/helpers/catch-error";
import { payoutServices } from "@/services/payout-service";
import { RequestPayoutPayload } from "@/validators/payout-validator";

export const requestPayoutAction = async (payload: RequestPayoutPayload) => {
  try {
    return await payoutServices.requestPayout(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const processPayoutAction = async (payoutId: string) => {
  try {
    return await payoutServices.processPayout(payoutId);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
