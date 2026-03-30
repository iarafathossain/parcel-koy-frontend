"use server";

import { catchError } from "@/helpers/catch-error";
import { speedServices } from "@/services/speed-service";
import {
  CreateSpeedPayload,
  UpdateSpeedPayload,
} from "@/validators/speed-validator";

export const getAllSpeedsAction = async (queryString: string) => {
  try {
    return await speedServices.getAllSpeeds(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createSpeedAction = async (payload: CreateSpeedPayload) => {
  try {
    return await speedServices.createSpeed(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateSpeedBySlugAction = async (
  slug: string,
  payload: UpdateSpeedPayload,
) => {
  try {
    return await speedServices.updateSpeedBySlug(slug, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteSpeedBySlugAction = async (slug: string) => {
  try {
    return await speedServices.deleteSpeedBySlug(slug);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
