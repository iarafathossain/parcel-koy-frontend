"use client";

import { getDashboardStatsAction } from "@/actions/dashboard-action";
import DashboardStateGate from "@/components/shared/dashboard-state-gate";
import { isMerchantDashboardData } from "@/types/dashboard-stats-type";
import { useQuery } from "@tanstack/react-query";
import ConnectStripeButton from "./connect-stripe-button";
import PayDuesButton from "./pay-dues-button";
import RequestPayoutForm from "./request-payout-form";

const PayoutWrapper = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", "merchant"],
    queryFn: () => getDashboardStatsAction(),
  });

  return (
    <DashboardStateGate
      isLoading={isLoading}
      isError={isError}
      error={error}
      response={response}
      roleLabel="merchant"
      isExpectedData={isMerchantDashboardData}
    >
      {(data) => {
        const availableBalance =
          data.merchant.balance > 0 ? data.merchant.balance : 0;
        const dueAmount =
          data.merchant.balance < 0 ? Math.abs(data.merchant.balance) : 0;

        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">My Payments</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your Stripe connection, clear dues, and request payouts.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <ConnectStripeButton />
              <PayDuesButton dueAmount={dueAmount} />
            </div>

            <RequestPayoutForm availableBalance={availableBalance} />
          </div>
        );
      }}
    </DashboardStateGate>
  );
};

export default PayoutWrapper;
