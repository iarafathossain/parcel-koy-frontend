import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IHub } from "@/types/hub-type";
import { ColumnDef } from "@tanstack/react-table";

export const hubColumns: ColumnDef<IHub>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Hub Name",
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
    id: "address",
    accessorKey: "address",
    header: "Address",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.address}
      </span>
    ),
  },
  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    header: "Contact Number",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.contactNumber}</span>
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
