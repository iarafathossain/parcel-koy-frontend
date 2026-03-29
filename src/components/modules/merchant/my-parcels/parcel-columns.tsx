import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IParcel } from "@/types/parcel-type";
import { ColumnDef } from "@tanstack/react-table";

export const parcelColumns: ColumnDef<IParcel>[] = [
  {
    id: "trackingId",
    accessorKey: "trackingId",
    header: "Tracking ID",
    cell: ({ row }) => (
      <span className="font-medium text-sm">{row.original.trackingId}</span>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {getCapitalized(row.original.status.replace(/_/g, " "))}
      </Badge>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.category?.name || "N/A"}
      </span>
    ),
  },
  {
    id: "receiverName",
    accessorKey: "receiverName",
    header: "Receiver",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{row.original.receiverName}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.receiverContactNumber}
        </span>
      </div>
    ),
  },
  {
    id: "actualWeight",
    accessorKey: "actualWeight",
    header: "Actual Weight",
    enableSorting: false,
    cell: ({ row }) => {
      const weight = row.original.actualWeight ?? row.original.declaredWeight;

      return <span className="text-sm text-muted-foreground">{weight} kg</span>;
    },
  },
  {
    id: "deliveryCharge",
    accessorKey: "deliveryCharge",
    header: "Delivery Charge",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatPrice(Number(row.original.deliveryCharge))}
      </span>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
