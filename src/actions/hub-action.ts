"use server";

import { catchError } from "@/helpers/catch-error";
import { hubServices } from "@/services/hub-service";
import { CreateHubPayload, UpdateHubPayload } from "@/validators/hub-validator";

export const getAllHubsAction = async (queryString: string) => {
  try {
    return await hubServices.getAllHubs(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createHubAction = async (payload: CreateHubPayload) => {
  try {
    return await hubServices.createHub(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateHubBySlugAction = async (
  slug: string,
  payload: UpdateHubPayload,
) => {
  try {
    return await hubServices.updateHubBySlug(slug, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteHubBySlugAction = async (slug: string) => {
  try {
    return await hubServices.deleteHubBySlug(slug);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
