"use server";

import { catchError } from "@/helpers/catch-error";
import { methodServices } from "@/services/method-service";
import {
  CreateMethodPayload,
  UpdateMethodPayload,
} from "@/validators/method-validator";

export const getAllMethodsAction = async (queryString: string) => {
  try {
    return await methodServices.getAllMethods(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

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

export const createMethodAction = async (payload: CreateMethodPayload) => {
  try {
    return await methodServices.createMethod(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateMethodBySlugAction = async (
  slug: string,
  payload: UpdateMethodPayload,
) => {
  try {
    return await methodServices.updateMethodBySlug(slug, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteMethodBySlugAction = async (slug: string) => {
  try {
    return await methodServices.deleteMethodBySlug(slug);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
