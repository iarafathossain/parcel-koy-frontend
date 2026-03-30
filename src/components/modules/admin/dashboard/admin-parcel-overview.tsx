"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminParcelOverviewProps {
  statuses: Record<string, number>;
}

const statusColorMap: Record<string, string> = {
  REQUESTED: "bg-blue-100 text-blue-800",
  PICKUP_RIDER_ASSIGNED: "bg-cyan-100 text-cyan-800",
  PICKED_UP: "bg-purple-100 text-purple-800",
  PICKUP_FAILED: "bg-red-100 text-red-800",
  RECEIVED_AT_ORIGIN_HUB: "bg-indigo-100 text-indigo-800",
  IN_TRANSIT: "bg-orange-100 text-orange-800",
  RECEIVED_AT_DESTINATION_HUB: "bg-yellow-100 text-yellow-800",
  OUT_FOR_DELIVERY: "bg-pink-100 text-pink-800",
  DELIVERED: "bg-green-100 text-green-800",
  PARTIAL_DELIVERY: "bg-amber-100 text-amber-800",
  DELIVERY_FAILED: "bg-red-100 text-red-800",
  ON_HOLD: "bg-gray-100 text-gray-800",
  RETURNED_TO_MERCHANT: "bg-slate-100 text-slate-800",
  CANCELLED: "bg-zinc-100 text-zinc-800",
};

const formatStatusText = (status: string): string => {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const AdminParcelOverview = ({ statuses }: AdminParcelOverviewProps) => {
  const statusEntries = Object.entries(statuses)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  const totalParcels = Object.values(statuses).reduce(
    (sum, val) => sum + val,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Parcel Status</CardTitle>
      </CardHeader>
      <CardContent>
        {statusEntries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No parcels in system</p>
        ) : (
          <div className="space-y-3">
            {statusEntries.map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      statusColorMap[status] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {count}
                  </Badge>
                  <span className="text-sm font-medium">
                    {formatStatusText(status)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {totalParcels > 0
                    ? ((count / totalParcels) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminParcelOverview;
