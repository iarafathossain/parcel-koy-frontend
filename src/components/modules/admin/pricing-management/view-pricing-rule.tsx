"use client";

import { getAllCategoriesAction } from "@/actions/category-action";
import { getAllMethodsAction } from "@/actions/method-action";
import { getAllSpeedsAction } from "@/actions/speed-action";
import { getAllZonesAction } from "@/actions/zone-action";
import DateCell from "@/components/shared/cell/date-cell";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { IPricingRule } from "@/types/pricing-type";
import { useQuery } from "@tanstack/react-query";

interface ViewPricingRuleProps {
  rule: IPricingRule;
}

const ViewPricingRule = ({ rule }: ViewPricingRuleProps) => {
  const { data: zonesResponse } = useQuery({
    queryKey: ["zones", "for-pricing-view"],
    queryFn: () => getAllZonesAction(""),
  });

  const { data: categoriesResponse } = useQuery({
    queryKey: ["categories", "for-pricing-view"],
    queryFn: () => getAllCategoriesAction(""),
  });

  const { data: methodsResponse } = useQuery({
    queryKey: ["methods", "for-pricing-view"],
    queryFn: () => getAllMethodsAction(""),
  });

  const { data: speedsResponse } = useQuery({
    queryKey: ["speeds", "for-pricing-view"],
    queryFn: () => getAllSpeedsAction(""),
  });

  const zones = zonesResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  const methods = methodsResponse?.data || [];
  const speeds = speedsResponse?.data || [];

  const originZoneName =
    zones.find((zone) => zone.id === rule.originalZoneId)?.name ||
    rule.originalZoneId;
  const destinationZoneName =
    zones.find((zone) => zone.id === rule.destinationZoneId)?.name ||
    rule.destinationZoneId;
  const categoryName =
    categories.find((category) => category.id === rule.categoryId)?.name ||
    (rule.categoryId ?? "—");
  const pickupMethodName =
    methods.find((method) => method.id === rule.pickupMethodId)?.name ||
    rule.pickupMethodId;
  const deliveryMethodName =
    methods.find((method) => method.id === rule.deliveryMethodId)?.name ||
    rule.deliveryMethodId;
  const speedName =
    speeds.find((speed) => speed.id === rule.speedId)?.name || rule.speedId;

  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Rule ID</p>
        <p className="text-sm text-muted-foreground break-all">{rule.id}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Origin Zone
          </p>
          <p className="text-sm text-muted-foreground break-all">
            {originZoneName}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Destination Zone
          </p>
          <p className="text-sm text-muted-foreground break-all">
            {destinationZoneName}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Category</p>
          <p className="text-sm text-muted-foreground break-all">
            {categoryName}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Speed</p>
          <p className="text-sm text-muted-foreground break-all">{speedName}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Pickup Method
          </p>
          <p className="text-sm text-muted-foreground break-all">
            {pickupMethodName}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Delivery Method
          </p>
          <p className="text-sm text-muted-foreground break-all">
            {deliveryMethodName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Min Weight
          </p>
          <p className="text-sm text-muted-foreground">{rule.minWeight} kg</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Max Weight
          </p>
          <p className="text-sm text-muted-foreground">{rule.maxWeight} kg</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Price</p>
          <p className="text-sm text-muted-foreground">
            {formatPrice(Number(rule.price || 0))}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Status</p>
        <p className="text-sm text-muted-foreground">
          {rule.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Created At</p>
        <DateCell date={rule.createdAt} />
      </div>
    </Card>
  );
};

export default ViewPricingRule;
