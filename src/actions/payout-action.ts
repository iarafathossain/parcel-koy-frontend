"use server";

import { catchError } from "@/helpers/catch-error";
import { payoutServices } from "@/services/payout-service";
import {
  ProcessPayoutPayload,
  RequestPayoutPayload,
  processPayoutZodSchema,
} from "@/validators/payout-validator";

export const getAllPendingPayoutsAction = async (queryString = "") => {
  try {
    return await payoutServices.getAllPendingPayouts(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const getAllTransactionsAction = async (queryString = "") => {
  try {
    return await payoutServices.getAllTransactions(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const requestPayoutAction = async (payload: RequestPayoutPayload) => {
  try {
    return await payoutServices.requestPayout(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const processPayoutAction = async (payload: ProcessPayoutPayload) => {
  try {
    const parsedPayload = processPayoutZodSchema.parse(payload);
    return await payoutServices.processPayout(parsedPayload.payoutId);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
