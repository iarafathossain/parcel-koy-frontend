"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelStats } from "@/types/dashboard-stats-type";

interface AdminSystemMetricsProps {
  parcels: ParcelStats;
}

const AdminSystemMetrics = ({ parcels }: AdminSystemMetricsProps) => {
  const inProgressCount = Object.values(parcels.byStatus).reduce((sum, val) => {
    const key = Object.keys(parcels.byStatus).find(
      (k) => parcels.byStatus[k] === val,
    );
    if (
      key &&
      ![
        "DELIVERED",
        "CANCELLED",
        "DELIVERY_FAILED",
        "RETURNED_TO_MERCHANT",
      ].includes(key)
    ) {
      return sum + val;
    }
    return sum;
  }, 0);

  const metrics = [
    {
      label: "Total Parcels",
      value: parcels.total,
      variant: "default" as const,
    },
    {
      label: "In Progress",
      value: inProgressCount,
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {metric.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metric.value}</div>
            <Badge className="mt-2" variant={metric.variant}>
              {metric.label}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminSystemMetrics;
