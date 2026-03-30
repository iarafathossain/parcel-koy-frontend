"use server";

import { catchError } from "@/helpers/catch-error";
import { zoneServices } from "@/services/zone-service";
import {
  CreateZonePayload,
  UpdateZonePayload,
} from "@/validators/zone-validator";

export const getAllZonesAction = async (queryString: string) => {
  try {
    return await zoneServices.getAllZones(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createZoneAction = async (payload: CreateZonePayload) => {
  try {
    return await zoneServices.createZone(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateZoneBySlugAction = async (
  slug: string,
  payload: UpdateZonePayload,
) => {
  try {
    return await zoneServices.updateZoneBySlug(slug, payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteZoneBySlugAction = async (slug: string) => {
  try {
    return await zoneServices.deleteZoneBySlug(slug);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
