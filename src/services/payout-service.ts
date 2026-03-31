import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { APIResponse } from "@/types/api-type";
import { RequestPayoutPayload } from "@/validators/payout-validator";

type PayoutRequestData = {
  payoutId?: string;
};

const getFallbackPayoutId = (response: unknown) => {
  if (
    typeof response === "object" &&
    response !== null &&
    "payoutId" in response &&
    typeof response.payoutId === "string"
  ) {
    return response.payoutId;
  }

  return undefined;
};

export const payoutServices = {
  requestPayout: async (payload: RequestPayoutPayload) => {
    try {
      const response = await httpClient.post<PayoutRequestData>(
        API.PAYOUTS.MAKE_PAYOUT_REQUEST,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to request payout");
      }

      const payoutId = response.data?.payoutId ?? getFallbackPayoutId(response);

      return {
        ...response,
        data: {
          payoutId,
        },
      } as APIResponse<PayoutRequestData>;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },

  processPayout: async (payoutId: string) => {
    try {
      const response = await httpClient.post<null>(
        API.PAYOUTS.PROCESS_PAYOUT(payoutId),
        {},
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to process payout");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
