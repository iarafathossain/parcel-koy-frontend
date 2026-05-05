import { getDashboardStatsAction } from "@/actions/dashboard-action";
import RiderDashboardCharts from "@/components/modules/rider/dashboard/rider-dashboard-charts";
import RiderFinancialsOverview from "@/components/modules/rider/dashboard/rider-financials-overview";
import RiderParcelOverview from "@/components/modules/rider/dashboard/rider-parcel-overview";
import RiderStatsCards from "@/components/modules/rider/dashboard/rider-stats-cards";
import { isRiderDashboardData } from "@/types/dashboard-stats-type";
import RiderCashCard from "./rider-cash-card";

const RiderDashboard = async () => {
  const response = await getDashboardStatsAction();

  if (!response.success || !response.data) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">
          {response.message || "Failed to load dashboard"}
        </p>
      </div>
    );
  }

  if (!isRiderDashboardData(response.data)) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">Invalid dashboard data for rider.</p>
      </div>
    );
  }

  const data = response.data;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Rider</h1>
        <p className="text-muted-foreground mt-1">
          Track your deliveries and earnings
        </p>
      </div>

      <RiderCashCard cashInHand={data.rider.cashInHand} />

      <RiderStatsCards parcels={data.parcels} />

      <RiderParcelOverview parcels={data.parcels} />

      <RiderFinancialsOverview financials={data.financials} />

      <RiderDashboardCharts charts={data.charts} />
    </div>
  );
};

export default RiderDashboard;
