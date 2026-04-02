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
    return { success: false, message: catchError(error) };
  }
};

export const createAreaAction = async (payload: CreateAreaPayload) => {
  try {
    return await areaServices.createArea(payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const updateAreaBySlugAction = async (
  slug: string,
  payload: UpdateAreaPayload,
) => {
  try {
    return await areaServices.updateAreaBySlug(slug, payload);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};

export const deleteAreaBySlugAction = async (slug: string) => {
  try {
    return await areaServices.deleteAreaBySlug(slug);
  } catch (error) {
    return { success: false, message: catchError(error) };
  }
};
