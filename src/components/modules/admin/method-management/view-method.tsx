"use client";

import DateCell from "@/components/shared/cell/date-cell";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IMethod } from "@/types/method-type";

interface ViewMethodProps {
  method: IMethod;
}

const ViewMethod = ({ method }: ViewMethodProps) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Method Name</p>
        <p className="text-sm font-medium">{method.name}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Slug</p>
        <p className="text-sm text-muted-foreground">{method.slug}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Type</p>
        <p className="text-sm text-muted-foreground">
          {getCapitalized(method.type.toLowerCase())}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Description</p>
        <p className="text-sm text-muted-foreground">
          {method.description || "—"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Base Fee</p>
        <p className="text-sm text-muted-foreground">
          {formatPrice(parseFloat(method.baseFee))}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Status</p>
        <p className="text-sm text-muted-foreground">
          {method.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Created At</p>
        <DateCell date={method.createdAt} />
      </div>
    </Card>
  );
};

export default ViewMethod;
