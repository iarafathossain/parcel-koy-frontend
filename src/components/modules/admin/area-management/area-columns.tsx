import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IArea } from "@/types/area-type";
import { ColumnDef } from "@tanstack/react-table";

export const areaColumns: ColumnDef<IArea>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Area Name",
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
    id: "zoneId",
    accessorKey: "zoneId",
    header: "Zone ID",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.zoneId}
      </span>
    ),
  },
  {
    id: "hubId",
    accessorKey: "hubId",
    header: "Hub",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.hubId || "—"}
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
