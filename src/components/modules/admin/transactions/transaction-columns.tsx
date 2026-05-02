import DateCell from "@/components/shared/cell/date-cell";
import { semanticTones } from "@/components/shared/semantic-tones";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { PayoutStatus } from "@/types/enum-type";
import { IPayout } from "@/types/payout-type";
import { ColumnDef } from "@tanstack/react-table";

const getStatusClasses = (status: string) => {
  if (status === PayoutStatus.COMPLETED) {
    return `${semanticTones.success.soft} border-success/20`;
  }

  if (status === PayoutStatus.REJECTED) {
    return `${semanticTones.danger.soft} border-destructive/20`;
  }

  return `${semanticTones.warning.soft} border-warning/20`;
};

export const getTransactionColumns = (
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
    id: "transactionId",
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.transactionId || "N/A"}
      </span>
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
        className={getStatusClasses(String(row.original.status))}
      >
        {getCapitalized(String(row.original.status).toLowerCase())}
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
