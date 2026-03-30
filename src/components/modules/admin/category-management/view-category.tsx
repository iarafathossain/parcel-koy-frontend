"use client";

import DateCell from "@/components/shared/cell/date-cell";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { ICategory } from "@/types/category-type";

interface ViewCategoryProps {
  category: ICategory;
}

const ViewCategory = ({ category }: ViewCategoryProps) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          Category Name
        </p>
        <p className="text-sm font-medium">{category.name}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Slug</p>
        <p className="text-sm text-muted-foreground">{category.slug}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          Base Weight (kg)
        </p>
        <p className="text-sm text-muted-foreground">{category.baseWeight}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Base Fee</p>
        <p className="text-sm text-muted-foreground">
          {formatPrice(parseFloat(category.baseFee))}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Status</p>
        <p className="text-sm text-muted-foreground">
          {category.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">Created At</p>
        <DateCell date={category.createdAt} />
      </div>
    </Card>
  );
};

export default ViewCategory;
