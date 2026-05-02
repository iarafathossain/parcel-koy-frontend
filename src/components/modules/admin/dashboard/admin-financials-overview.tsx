"use client";

import { semanticTones } from "@/components/shared/semantic-tones";
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
      tone: semanticTones.info.soft,
      description: "In system",
    },
    {
      title: "Delivered COD",
      value: financials.deliveredCodAmount,
      icon: TrendingUp,
      tone: semanticTones.success.soft,
      description: "Successfully delivered",
    },
    {
      title: "Merchant Balance",
      value: financials.totalMerchantBalance,
      icon: Wallet,
      tone:
        financials.totalMerchantBalance < 0
          ? semanticTones.danger.soft
          : semanticTones.secondary.soft,
      description: "Total balance",
    },
    {
      title: "Rider Cash",
      value: financials.totalRiderCashInHand,
      icon: PiggyBank,
      tone: semanticTones.warning.soft,
      description: "In hand",
    },
    {
      title: "Pending Payout",
      value: financials.pendingPayoutAmount,
      icon: TrendingDown,
      tone: semanticTones.warning.soft,
      description: "Awaiting payout",
    },
    {
      title: "Completed Payout",
      value: financials.completedPayoutAmount,
      icon: CreditCard,
      tone: semanticTones.info.soft,
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
                  <div className={`${item.tone} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4" />
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
