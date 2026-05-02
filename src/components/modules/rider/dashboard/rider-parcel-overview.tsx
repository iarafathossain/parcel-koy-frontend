"use client";

import { semanticTones } from "@/components/shared/semantic-tones";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiderParcelStats } from "@/types/dashboard-stats-type";

interface RiderParcelOverviewProps {
  parcels: RiderParcelStats;
}

const statusColorMap: Record<string, string> = {
  REQUESTED: semanticTones.info.soft,
  PICKUP_RIDER_ASSIGNED: semanticTones.info.soft,
  PICKED_UP: semanticTones.secondary.soft,
  PICKUP_FAILED: semanticTones.danger.soft,
  RECEIVED_AT_ORIGIN_HUB: semanticTones.info.soft,
  IN_TRANSIT: semanticTones.warning.soft,
  RECEIVED_AT_DESTINATION_HUB: semanticTones.warning.soft,
  OUT_FOR_DELIVERY: semanticTones.warning.soft,
  DELIVERED: semanticTones.success.soft,
  PARTIAL_DELIVERY: semanticTones.warning.soft,
  DELIVERY_FAILED: semanticTones.danger.soft,
  ON_HOLD: semanticTones.muted.soft,
  RETURNED_TO_MERCHANT: semanticTones.muted.soft,
  CANCELLED: semanticTones.muted.soft,
};

const formatStatusText = (status: string): string => {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const RiderParcelOverview = ({ parcels }: RiderParcelOverviewProps) => {
  const statusEntries = Object.entries(parcels.byStatus)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {statusEntries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No parcels assigned</p>
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
                      statusColorMap[status] || semanticTones.muted.soft
                    }
                  >
                    {count}
                  </Badge>
                  <span className="text-sm font-medium">
                    {formatStatusText(status)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {parcels.total > 0
                    ? ((count / parcels.total) * 100).toFixed(1)
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

export default RiderParcelOverview;
