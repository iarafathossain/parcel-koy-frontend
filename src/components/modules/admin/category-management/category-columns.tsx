import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { ICategory } from "@/types/category-type";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<ICategory>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.name}</span>
    ),
  },
  {
    id: "slug",
    accessorKey: "slug",
    header: "Slug",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.slug}</span>
    ),
  },
  {
    id: "baseWeight",
    accessorKey: "baseWeight",
    header: "Base Weight (kg)",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.baseWeight}</span>
    ),
  },
  {
    id: "baseFee",
    accessorKey: "baseFee",
    header: "Base Fee",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatPrice(parseFloat(row.original.baseFee))}
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
