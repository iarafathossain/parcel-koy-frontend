import DateCell from "@/components/shared/cell/date-cell";
import StatusBadgeCell from "@/components/shared/cell/status-badge-cell";
import UserInfoCell from "@/components/shared/cell/user-info";
import { IMerchant } from "@/types/user-type";
import { ColumnDef } from "@tanstack/react-table";

export const merchantColumns: ColumnDef<IMerchant>[] = [
  {
    id: "user.name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.user.name}
        email={row.original.user.email}
        profilePhoto={row.original.user.image}
      />
    ),
  },
  {
    id: "businessName",
    accessorKey: "businessName",
    header: "Business",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.businessName || "N/A"}
      </span>
    ),
  },
  {
    id: "originArea.name",
    accessorKey: "originArea.name",
    enableSorting: false,
    header: "Origin Area",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.originArea?.name || "N/A"}
      </span>
    ),
  },
  {
    id: "user.contactNumber",
    accessorKey: "contactNumber",
    enableSorting: false,
    header: "Contact Number",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.user.contactNumber || "N/A"}
      </span>
    ),
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.balance || "0"}
      </span>
    ),
  },
  {
    id: "user.status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadgeCell status={row.original.user.status} />,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
