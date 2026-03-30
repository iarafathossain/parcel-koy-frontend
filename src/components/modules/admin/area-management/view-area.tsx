"use client";

import DateCell from "@/components/shared/cell/date-cell";
import { Card } from "@/components/ui/card";
import { IArea } from "@/types/area-type";

interface ViewAreaProps {
  area: IArea;
}

const ViewArea = ({ area }: ViewAreaProps) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Area Name</p>
        <p className="text-sm font-medium">{area.name}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Slug</p>
        <p className="text-sm text-muted-foreground">{area.slug}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Zone ID</p>
        <p className="text-sm text-muted-foreground">{area.zoneId}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Hub ID</p>
        <p className="text-sm text-muted-foreground">{area.hubId || "—"}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Status</p>
        <p className="text-sm text-muted-foreground">
          {area.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Created At</p>
        <DateCell date={area.createdAt} />
      </div>
    </Card>
  );
};

export default ViewArea;
