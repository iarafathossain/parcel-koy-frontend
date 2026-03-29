"use server";

import { catchError } from "@/helpers/catch-error";
import { methodServices } from "@/services/method-service";

export const getAllPickupMethodsAction = async () => {
  try {
    return await methodServices.getAllPickupMethods();
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const getAllDeliveryMethodsAction = async () => {
  try {
    return await methodServices.getAllDeliveryMethods();
  } catch (error) {
    throw new Error(catchError(error));
  }
};
