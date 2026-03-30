import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { IParcel } from "@/types/parcel-type";
import { CreateParcelPayload } from "@/validators/parcel-validator";

export const parcelServices = {
  createParcel: async (payload: CreateParcelPayload) => {
    try {
      const response = await httpClient.post<IParcel>(
        API.PARCELS.CREATE_PARCEL,
        payload,
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create parcel request");
      }

      return response;
    } catch (error: unknown) {
      throw new Error(catchError(error));
    }
  },
};
