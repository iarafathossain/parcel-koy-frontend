import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { APIResponse } from "@/types/api-type";
import { StripeConnectOnboardingPayload } from "@/validators/payment-account-validator";

type RedirectUrlPayload = {
  url: string;
};

type StripeVerifyPayload = {
  stripeConnectAccountId: string;
};

const getFallbackUrl = (response: unknown) => {
  if (
    typeof response === "object" &&
    response !== null &&
    "url" in response &&
    typeof response.url === "string"
  ) {
    return response.url;
  }

  return undefined;
};

export const paymentAccountServices = {
  connectStripeOnboard: async (payload: StripeConnectOnboardingPayload) => {
    try {
      const response = await httpClient.post<RedirectUrlPayload>(
        API.PAYMENT.CONNECT_STRIPE_ONBOARD,
        payload,
      );

      if (!response.success) {
        throw new Error(
          response.message || "Failed to create Stripe onboarding",
        );
      }

      const url = response.data?.url ?? getFallbackUrl(response);

      if (!url) {
        throw new Error("Stripe onboarding URL was not returned");
      }

      return {
        ...response,
        data: {
          url,
        },
      } as APIResponse<RedirectUrlPayload>;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },

  verifyStripeConnect: async (accountId: string) => {
    try {
      const response = await httpClient.post<StripeVerifyPayload>(
        API.PAYMENT.STRIPE_VERIFY,
        { accountId: accountId },
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to verify Stripe account");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },

  clearDueCheckout: async () => {
    try {
      const response = await httpClient.post<RedirectUrlPayload>(
        API.PAYMENT.CLEAR_DUE,
        {},
      );

      if (!response.success) {
        throw new Error(
          response.message || "Failed to create checkout session",
        );
      }

      const url = response.data?.url ?? getFallbackUrl(response);

      if (!url) {
        throw new Error("Checkout URL was not returned");
      }

      return {
        ...response,
        data: {
          url,
        },
      } as APIResponse<RedirectUrlPayload>;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
