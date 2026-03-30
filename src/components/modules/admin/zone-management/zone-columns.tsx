import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IZone } from "@/types/zone-type";
import { ColumnDef } from "@tanstack/react-table";

export const zoneColumns: ColumnDef<IZone>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Zone Name",
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
    id: "isInsideDhaka",
    accessorKey: "isInsideDhaka",
    header: "Coverage",
    cell: ({ row }) => (
      <Badge variant={row.original.isInsideDhaka ? "default" : "secondary"}>
        {row.original.isInsideDhaka ? "Inside Dhaka" : "Outside Dhaka"}
      </Badge>
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
