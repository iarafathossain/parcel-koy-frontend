"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { AdminFinancials } from "@/types/dashboard-stats-type";
import {
  CreditCard,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface AdminFinancialsOverviewProps {
  financials: AdminFinancials;
}

const AdminFinancialsOverview = ({
  financials,
}: AdminFinancialsOverviewProps) => {
  const financialItems = [
    {
      title: "Total COD Amount",
      value: financials.totalCodAmount,
      icon: CreditCard,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
      description: "In system",
    },
    {
      title: "Delivered COD",
      value: financials.deliveredCodAmount,
      icon: TrendingUp,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
      description: "Successfully delivered",
    },
    {
      title: "Merchant Balance",
      value: financials.totalMerchantBalance,
      icon: Wallet,
      bgColor:
        financials.totalMerchantBalance < 0
          ? "bg-red-500/10"
          : "bg-purple-500/10",
      iconColor:
        financials.totalMerchantBalance < 0
          ? "text-red-600"
          : "text-purple-600",
      description: "Total balance",
    },
    {
      title: "Rider Cash",
      value: financials.totalRiderCashInHand,
      icon: PiggyBank,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
      description: "In hand",
    },
    {
      title: "Pending Payout",
      value: financials.pendingPayoutAmount,
      icon: TrendingDown,
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-600",
      description: "Awaiting payout",
    },
    {
      title: "Completed Payout",
      value: financials.completedPayoutAmount,
      icon: CreditCard,
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-600",
      description: "Successfully paid",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {financialItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg border border-muted bg-muted/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.title}
                  </span>
                  <div className={`${item.bgColor} p-2 rounded-lg`}>
                    <Icon className={`${item.iconColor} w-4 h-4`} />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold">{formatPrice(item.value)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFinancialsOverview;
