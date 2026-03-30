"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { MerchantFinancials, ParcelStats } from "@/types/dashboard-stats-type";
import { Clock, DollarSign, Package, TrendingUp } from "lucide-react";

interface MerchantStatsCardsProps {
  parcels: ParcelStats;
  financials: MerchantFinancials;
}

const MerchantStatsCards = ({
  parcels,
  financials,
}: MerchantStatsCardsProps) => {
  const stats = [
    {
      title: "Total Parcels",
      value: parcels.total,
      icon: Package,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Delivery Charge",
      value: formatPrice(financials.totalDeliveryCharge),
      icon: DollarSign,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      title: "Total COD Amount",
      value: formatPrice(financials.totalCodAmount),
      icon: TrendingUp,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
    },
    {
      title: "Delivered COD",
      value: formatPrice(financials.deliveredCodAmount),
      icon: Clock,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`${stat.iconColor} w-4 h-4`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">as of today</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MerchantStatsCards;
