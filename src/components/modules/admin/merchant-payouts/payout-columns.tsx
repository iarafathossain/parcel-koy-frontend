import DateCell from "@/components/shared/cell/date-cell";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { PayoutStatus } from "@/types/enum-type";
import { IPayout } from "@/types/payout-type";
import { ColumnDef } from "@tanstack/react-table";

const getStatusClasses = (status: string) => {
  if (status === PayoutStatus.COMPLETED) {
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  }

  if (status === PayoutStatus.REJECTED) {
    return "bg-red-100 text-red-800 border-red-200";
  }

  return "bg-amber-100 text-amber-800 border-amber-200";
};

export const getPayoutColumns = (
  onOpenDetails: (payout: IPayout) => void,
): ColumnDef<IPayout>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: "Payout ID",
    cell: ({ row }) => (
      <button
        type="button"
        className="font-medium text-sm text-primary hover:underline"
        onClick={() => onOpenDetails(row.original)}
      >
        {row.original.payoutId || row.original.id}
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
    id: "merchant.user.email",
    accessorKey: "merchant.user.email",
    enableSorting: false,
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.merchant?.user?.email || "N/A"}
      </span>
    ),
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatPrice(Number(row.original.amount || 0))}
      </span>
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
        {getCapitalized(String(row.original.status).toLowerCase())}
      </Badge>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Requested At",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
