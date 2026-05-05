"use client";

import { semanticTones } from "@/components/shared/semantic-tones";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ParcelStatusOverviewProps {
  statuses: Record<string, number>;
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

const ParcelStatusOverview = ({ statuses }: ParcelStatusOverviewProps) => {
  const statusEntries = Object.entries(statuses)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {statusEntries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No parcels yet</p>
        ) : (
          <div className="space-y-default">
            {statusEntries.map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between pad-compact radius-md bg-muted/50"
              >
                <div className="flex items-center gap-standard">
                  <Badge
                    className={
                      statusColorMap[status] || semanticTones.muted.soft
                    }
                  >
                    {count}
                  </Badge>
                  <span className="label-default">
                    {formatStatusText(status)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {(
                    (count /
                      Object.values(statuses).reduce((a, b) => a + b, 0)) *
                    100
                  ).toFixed(1)}
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

export default ParcelStatusOverview;
