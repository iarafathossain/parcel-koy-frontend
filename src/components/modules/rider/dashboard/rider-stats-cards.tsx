"use client";

import { semanticTones } from "@/components/shared/semantic-tones";
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
      tone: semanticTones.info.soft,
    },
    {
      title: "Pickups",
      value: parcels.pickups,
      icon: TrendingUp,
      tone: semanticTones.secondary.soft,
    },
    {
      title: "Deliveries",
      value: parcels.deliveries,
      icon: Clock,
      tone: semanticTones.warning.soft,
    },
    {
      title: "Delivered",
      value: parcels.delivered,
      icon: CheckCircle,
      tone: semanticTones.success.soft,
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
              <div className={`${stat.tone} p-2 rounded-lg`}>
                <Icon className="w-4 h-4" />
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
