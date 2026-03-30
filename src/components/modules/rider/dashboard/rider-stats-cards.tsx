"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiderParcelStats } from "@/types/dashboard-stats-type";
import { CheckCircle, Clock, Package, TrendingUp } from "lucide-react";

interface RiderStatsCardsProps {
  parcels: RiderParcelStats;
}

const RiderStatsCards = ({ parcels }: RiderStatsCardsProps) => {
  const stats = [
    {
      title: "Total Parcels",
      value: parcels.total,
      icon: Package,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Pickups",
      value: parcels.pickups,
      icon: TrendingUp,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
    },
    {
      title: "Deliveries",
      value: parcels.deliveries,
      icon: Clock,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
    {
      title: "Delivered",
      value: parcels.delivered,
      icon: CheckCircle,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
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
              <p className="text-xs text-muted-foreground mt-1">today</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RiderStatsCards;
