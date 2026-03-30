"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminOverview } from "@/types/dashboard-stats-type";
import {
  AlertCircle,
  CheckCircle,
  Grid3X3,
  Package,
  Store,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";

interface AdminOverviewCardsProps {
  overview: AdminOverview;
  users: {
    active: number;
    blocked: number;
  };
}

const AdminOverviewCards = ({ overview, users }: AdminOverviewCardsProps) => {
  const mainMetrics = [
    {
      title: "Merchants",
      value: overview.merchants,
      icon: Store,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Riders",
      value: overview.riders,
      icon: Users,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      title: "Admins",
      value: overview.admins,
      icon: AlertCircle,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Parcels",
      value: overview.parcels,
      icon: Package,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
    {
      title: "Hubs",
      value: overview.hubs,
      icon: Warehouse,
      bgColor: "bg-pink-500/10",
      iconColor: "text-pink-600",
    },
    {
      title: "Zones",
      value: overview.zones,
      icon: Zap,
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-600",
    },
    {
      title: "Areas",
      value: overview.areas,
      icon: Grid3X3,
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-600",
    },
    {
      title: "Active Users",
      value: users.active,
      icon: CheckCircle,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mainMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="border-0">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className={`${metric.bgColor} p-2 rounded-lg`}>
                <Icon className={`${metric.iconColor} w-4 h-4`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-1">in system</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminOverviewCards;
