"use server";

import { areaServices } from "@/services/area-service";

export const getAllAreasAction = async () => {
  return await areaServices.getAllAreas();
};
