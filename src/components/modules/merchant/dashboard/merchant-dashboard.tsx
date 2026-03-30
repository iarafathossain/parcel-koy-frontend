"use client";

import { getDashboardStatsAction } from "@/actions/dashboard-action";
import DashboardCharts from "@/components/modules/merchant/dashboard/dashboard-charts";
import FinancialsOverview from "@/components/modules/merchant/dashboard/financials-overview";
import MerchantBalanceCard from "@/components/modules/merchant/dashboard/merchant-balance-card";
import MerchantStatsCards from "@/components/modules/merchant/dashboard/merchant-stats-cards";
import ParcelStatusOverview from "@/components/modules/merchant/dashboard/parcel-status-overview";
import DataLoading from "@/components/shared/data-loading";
import { MerchantDashboardData } from "@/types/dashboard-stats-type";
import { useQuery } from "@tanstack/react-query";

const MerchantDashboard = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", "merchant"],
    queryFn: () => getDashboardStatsAction(),
  });

  if (isLoading) {
    return <DataLoading />;
  }

  if (isError || !response?.success || !response?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load dashboard"}
        </p>
      </div>
    );
  }

  const data = response.data as MerchantDashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {data.merchant.businessName}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your business overview and performance metrics
        </p>
      </div>

      {/* Balance Card */}
      <MerchantBalanceCard balance={data.merchant.balance} />

      {/* Stats Cards */}
      <MerchantStatsCards parcels={data.parcels} financials={data.financials} />

      {/* Parcel Status Overview */}
      <ParcelStatusOverview statuses={data.parcels.byStatus} />

      {/* Financials Overview */}
      <FinancialsOverview financials={data.financials} />

      {/* Charts */}
      <DashboardCharts charts={data.charts} />
    </div>
  );
};

export default MerchantDashboard;
