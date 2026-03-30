"use client";

import { getDashboardStatsAction } from "@/actions/dashboard-action";
import AdminDashboardCharts from "@/components/modules/admin/dashboard/admin-dashboard-charts";
import AdminFinancialsOverview from "@/components/modules/admin/dashboard/admin-financials-overview";
import AdminOverviewCards from "@/components/modules/admin/dashboard/admin-overview-cards";
import AdminParcelOverview from "@/components/modules/admin/dashboard/admin-parcel-overview";
import AdminSystemMetrics from "@/components/modules/admin/dashboard/admin-system-metrics";
import DashboardStateGate from "@/components/shared/dashboard-state-gate";
import { isAdminDashboardData } from "@/types/dashboard-stats-type";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", "admin"],
    queryFn: () => getDashboardStatsAction(),
  });

  return (
    <DashboardStateGate
      isLoading={isLoading}
      isError={isError}
      error={error}
      response={response}
      roleLabel="admin"
      isExpectedData={isAdminDashboardData}
    >
      {(data) => (
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              System Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete overview of your entire delivery network
            </p>
          </div>

          {/* Key Metrics */}
          <AdminOverviewCards overview={data.overview} users={data.users} />

          {/* System Metrics */}
          <AdminSystemMetrics parcels={data.parcels} />

          {/* Financials Overview */}
          <AdminFinancialsOverview financials={data.financials} />

          {/* Parcel Status Overview */}
          <AdminParcelOverview statuses={data.parcels.byStatus} />

          {/* Charts */}
          <AdminDashboardCharts charts={data.charts} />
        </div>
      )}
    </DashboardStateGate>
  );
};

export default AdminDashboard;
