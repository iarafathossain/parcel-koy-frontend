"use server";

import { catchError } from "@/helpers/catch-error";
import { paymentAccountServices } from "@/services/payment-account-service";
import { StripeConnectOnboardingPayload } from "@/validators/payment-account-validator";

export const connectStripeOnboardAction = async (
  payload: StripeConnectOnboardingPayload,
) => {
  try {
    return await paymentAccountServices.connectStripeOnboard(payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const verifyStripeConnectAction = async (accountId: string) => {
  try {
    return await paymentAccountServices.verifyStripeConnect(accountId);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const clearDueCheckoutAction = async () => {
  try {
    return await paymentAccountServices.clearDueCheckout();
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};
