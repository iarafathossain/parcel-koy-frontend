import { catchError } from "@/helpers/catch-error";
import { API } from "@/lib/api-endpoints";
import { httpClient } from "@/lib/axios/http-client";
import { APIResponse } from "@/types/api-type";
import { DashboardData } from "@/types/dashboard-stats-type";

export const dashboardService = {
  getStats: async (): Promise<APIResponse<DashboardData>> => {
    try {
      const response = await httpClient.get<DashboardData>(API.STATS.GET_STATS);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch dashboard stats");
      }

      return response;
    } catch (error) {
      throw new Error(catchError(error));
    }
  },
};
