"use client";

import { semanticTones } from "@/components/shared/semantic-tones";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminOverview } from "@/types/dashboard-stats-type";
import {
  AlertCircle,
  Grid3X3,
  Package,
  Store,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";

interface AdminOverviewCardsProps {
  overview: AdminOverview;
}

const AdminOverviewCards = ({ overview }: AdminOverviewCardsProps) => {
  const mainMetrics = [
    {
      title: "Merchants",
      value: overview.merchants,
      icon: Store,
      tone: semanticTones.info.soft,
    },
    {
      title: "Riders",
      value: overview.riders,
      icon: Users,
      tone: semanticTones.success.soft,
    },
    {
      title: "Admins",
      value: overview.admins,
      icon: AlertCircle,
      tone: semanticTones.secondary.soft,
    },
    {
      title: "Total Parcels",
      value: overview.parcels,
      icon: Package,
      tone: semanticTones.warning.soft,
    },
    {
      title: "Hubs",
      value: overview.hubs,
      icon: Warehouse,
      tone: semanticTones.secondary.soft,
    },
    {
      title: "Zones",
      value: overview.zones,
      icon: Zap,
      tone: semanticTones.warning.soft,
    },
    {
      title: "Areas",
      value: overview.areas,
      icon: Grid3X3,
      tone: semanticTones.info.soft,
    },
  ];

  return (
    <div className="grid gap-standard md:grid-cols-2 lg:grid-cols-4">
      {mainMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="border-0">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="label-default">{metric.title}</CardTitle>
              <div className={`${metric.tone} p-2 radius-md`}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="stat-value">{metric.value}</p>
              <p className="body-small text-muted-foreground mt-1">in system</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminOverviewCards;
