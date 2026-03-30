"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { MerchantFinancials } from "@/types/dashboard-stats-type";
import { BarChart3, CheckCircle, Clock, CreditCard } from "lucide-react";

interface FinancialsOverviewProps {
  financials: MerchantFinancials;
}

const FinancialsOverview = ({ financials }: FinancialsOverviewProps) => {
  const financialItems = [
    {
      title: "Total COD Amount",
      value: financials.totalCodAmount,
      icon: CreditCard,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
      description: "Total cash on delivery",
    },
    {
      title: "Delivered COD Amount",
      value: financials.deliveredCodAmount,
      icon: CheckCircle,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
      description: "Successfully delivered COD",
    },
    {
      title: "Pending Payout",
      value: financials.pendingPayoutAmount,
      icon: Clock,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
      description: "Awaiting payout",
    },
    {
      title: "Completed Payout",
      value: financials.completedPayoutAmount,
      icon: BarChart3,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
      description: "Successfully paid out",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financials Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

export default FinancialsOverview;
