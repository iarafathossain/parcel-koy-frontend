"use server";

import { catchError } from "@/helpers/catch-error";
import { dashboardService } from "@/services/dashboard-service";

export const getDashboardStatsAction = async () => {
  try {
    return await dashboardService.getStats();
  } catch (error) {
    throw new Error(catchError(error));
  }
};
