"use client";

import { Badge } from "@/components/ui/badge";
import { IParcel } from "@/types/parcel-type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action"; // Update path if needed

export const assignmentColumns = (
  onUpdateStatus: (parcel: IParcel) => void,
  onVerifyOtp: (parcel: IParcel) => void,
): ColumnDef<IParcel>[] => [
  {
    accessorKey: "trackingId",
    header: "Tracking ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant="outline">{status.replace(/_/g, " ")}</Badge>;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.receiverName}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.receiverContactNumber}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        onUpdateStatus={onUpdateStatus}
        onVerifyOtp={onVerifyOtp}
      />
    ),
  },
];
