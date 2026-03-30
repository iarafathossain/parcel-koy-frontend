"use client";

import DateCell from "@/components/shared/cell/date-cell";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { ISpeed } from "@/types/speed-type";

interface ViewSpeedProps {
  speed: ISpeed;
}

const ViewSpeed = ({ speed }: ViewSpeedProps) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Speed Name</p>
        <p className="text-sm font-medium">{speed.name}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Slug</p>
        <p className="text-sm text-muted-foreground">{speed.slug}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Description</p>
        <p className="text-sm text-muted-foreground">
          {speed.description || "—"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">SLA Hours</p>
        <p className="text-sm text-muted-foreground">{speed.slaHours}h</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Base Fee</p>
        <p className="text-sm text-muted-foreground">
          {formatPrice(parseFloat(speed.baseFee))}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Status</p>
        <p className="text-sm text-muted-foreground">
          {speed.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Created At</p>
        <DateCell date={speed.createdAt} />
      </div>
    </Card>
  );
};

export default ViewSpeed;
