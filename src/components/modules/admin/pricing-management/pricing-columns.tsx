import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IPricingRule } from "@/types/pricing-type";
import { ColumnDef } from "@tanstack/react-table";

export const getPricingColumns = (
  onOpenDetails: (rule: IPricingRule) => void,
): ColumnDef<IPricingRule>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: "Rule ID",
    enableSorting: false,
    cell: ({ row }) => (
      <button
        type="button"
        className="font-medium text-sm text-primary hover:underline"
        onClick={() => onOpenDetails(row.original)}
      >
        {row.original.id}
      </button>
    ),
  },
  {
    id: "minWeight",
    accessorKey: "minWeight",
    header: "Weight Range",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {row.original.minWeight} - {row.original.maxWeight} kg
      </span>
    ),
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatPrice(Number(row.original.price || 0))}
      </span>
    ),
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {getCapitalized(row.original.isActive ? "active" : "inactive")}
      </Badge>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
