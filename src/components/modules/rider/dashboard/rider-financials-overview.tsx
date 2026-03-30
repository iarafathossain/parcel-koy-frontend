"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { RiderFinancials } from "@/types/dashboard-stats-type";
import { CheckCircle, CreditCard, TrendingUp, Wallet } from "lucide-react";

interface RiderFinancialsOverviewProps {
  financials: RiderFinancials;
}

const RiderFinancialsOverview = ({
  financials,
}: RiderFinancialsOverviewProps) => {
  const financialItems = [
    {
      title: "Total COD Amount",
      value: financials.totalCodAmount,
      icon: CreditCard,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
      description: "Cash collected",
    },
    {
      title: "Delivered COD",
      value: financials.deliveredCodAmount,
      icon: CheckCircle,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
      description: "Delivered orders",
    },
    {
      title: "Delivery Charges",
      value: financials.totalDeliveryCharge,
      icon: TrendingUp,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
      description: "Earned from deliveries",
    },
    {
      title: "Total Collected",
      value: financials.totalCollectedCash,
      icon: Wallet,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
      description: "Cash in hand",
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

export default RiderFinancialsOverview;
