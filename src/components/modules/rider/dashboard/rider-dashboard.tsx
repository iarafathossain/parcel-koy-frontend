"use client";

import { getDashboardStatsAction } from "@/actions/dashboard-action";
import RiderCashCard from "@/components/modules/rider/dashboard/rider-cash-card";
import RiderDashboardCharts from "@/components/modules/rider/dashboard/rider-dashboard-charts";
import RiderFinancialsOverview from "@/components/modules/rider/dashboard/rider-financials-overview";
import RiderParcelOverview from "@/components/modules/rider/dashboard/rider-parcel-overview";
import RiderStatsCards from "@/components/modules/rider/dashboard/rider-stats-cards";
import DashboardStateGate from "@/components/shared/dashboard-state-gate";
import { isRiderDashboardData } from "@/types/dashboard-stats-type";
import { useQuery } from "@tanstack/react-query";

const RiderDashboard = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", "rider"],
    queryFn: () => getDashboardStatsAction(),
  });

  return (
    <DashboardStateGate
      isLoading={isLoading}
      isError={isError}
      error={error}
      response={response}
      roleLabel="rider"
      isExpectedData={isRiderDashboardData}
    >
      {(data) => (
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, Rider
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your deliveries and earnings
            </p>
          </div>

          {/* Cash in Hand Card */}
          <RiderCashCard cashInHand={data.rider.cashInHand} />

          {/* Stats Cards */}
          <RiderStatsCards parcels={data.parcels} />

          {/* Parcel Overview */}
          <RiderParcelOverview parcels={data.parcels} />

          {/* Financials Overview */}
          <RiderFinancialsOverview financials={data.financials} />

          {/* Charts */}
          <RiderDashboardCharts charts={data.charts} />
        </div>
      )}
    </DashboardStateGate>
  );
};

export default RiderDashboard;
