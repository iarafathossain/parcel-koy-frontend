import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IParcel } from "@/types/parcel-type";
import { ColumnDef } from "@tanstack/react-table";

const getStatusClasses = (status: string) => {
  if (status === "DELIVERED") {
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  }

  if (
    status === "IN_TRANSIT" ||
    status === "OUT_FOR_DELIVERY" ||
    status === "PICKED_UP"
  ) {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }

  if (
    status === "RETURNED_TO_MERCHANT" ||
    status === "DELIVERY_FAILED" ||
    status === "PICKUP_FAILED" ||
    status === "CANCELLED"
  ) {
    return "bg-red-100 text-red-800 border-red-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
};

export const getParcelColumns = (
  onOpenDetails: (parcel: IParcel) => void,
): ColumnDef<IParcel>[] => [
  {
    id: "trackingId",
    accessorKey: "trackingId",
    header: "Tracking ID",
    cell: ({ row }) => (
      <button
        type="button"
        className="font-medium text-sm text-primary hover:underline"
        onClick={() => onOpenDetails(row.original)}
      >
        {row.original.trackingId}
      </button>
    ),
  },
  {
    id: "merchant.businessName",
    accessorKey: "merchant.businessName",
    header: "Merchant",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {row.original.merchant?.businessName || "N/A"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.merchant?.user?.name || "N/A"}
        </span>
      </div>
    ),
  },
  {
    id: "receiver",
    accessorKey: "receiverName",
    enableSorting: false,
    header: "Customer & Phone",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {row.original.receiverName || "N/A"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.receiverContactNumber || "N/A"}
        </span>
      </div>
    ),
  },
  {
    id: "destinationArea.name",
    accessorKey: "destinationArea.name",
    enableSorting: false,
    header: "Area/Hub",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {row.original.destinationArea?.name || "N/A"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.destinationHub?.name || "No Hub Assigned"}
        </span>
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={getStatusClasses(row.original.status)}
      >
        {getCapitalized(row.original.status.replace(/_/g, " "))}
      </Badge>
    ),
  },
  {
    id: "codAmount",
    accessorKey: "codAmount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatPrice(Number(row.original.codAmount || 0))}
      </span>
    ),
  },
];
