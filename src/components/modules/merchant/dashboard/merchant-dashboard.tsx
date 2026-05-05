import { getDashboardStatsAction } from "@/actions/dashboard-action";
import DashboardCharts from "@/components/modules/merchant/dashboard/dashboard-charts";
import FinancialsOverview from "@/components/modules/merchant/dashboard/financials-overview";
import MerchantBalanceCard from "@/components/modules/merchant/dashboard/merchant-balance-card";
import MerchantStatsCards from "@/components/modules/merchant/dashboard/merchant-stats-cards";
import ParcelStatusOverview from "@/components/modules/merchant/dashboard/parcel-status-overview";
import { isMerchantDashboardData } from "@/types/dashboard-stats-type";

const MerchantDashboard = async () => {
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

  if (!isMerchantDashboardData(response.data)) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">Invalid dashboard data for merchant.</p>
      </div>
    );
  }

  const data = response.data;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {data.merchant.businessName}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your business overview and performance metrics
        </p>
      </div>

      <MerchantBalanceCard balance={data.merchant.balance} />

      <MerchantStatsCards
        parcels={data.parcels}
        financials={data.financials}
      />

      <ParcelStatusOverview statuses={data.parcels.byStatus} />

      <FinancialsOverview financials={data.financials} />

      <DashboardCharts charts={data.charts} />
    </div>
  );
};

export default MerchantDashboard;
