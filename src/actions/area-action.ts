"use server";

import { catchError } from "@/helpers/catch-error";
import { areaServices } from "@/services/area-service";
import {
  CreateAreaPayload,
  UpdateAreaPayload,
} from "@/validators/area-validator";

export const getAllAreasAction = async (queryString: string) => {
  try {
    return await areaServices.getAllAreas(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createAreaAction = async (payload: CreateAreaPayload) => {
  try {
    return await areaServices.createArea(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateAreaBySlugAction = async (
  slug: string,
  payload: UpdateAreaPayload,
) => {
  try {
    return await areaServices.updateAreaBySlug(slug, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteAreaBySlugAction = async (slug: string) => {
  try {
    return await areaServices.deleteAreaBySlug(slug);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
