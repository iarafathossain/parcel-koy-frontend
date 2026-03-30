import DateCell from "@/components/shared/cell/date-cell";
import StatusBadgeCell from "@/components/shared/cell/status-badge-cell";
import UserInfoCell from "@/components/shared/cell/user-info";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IRider } from "@/types/user-type";
import { ColumnDef } from "@tanstack/react-table";

export const riderColumns: ColumnDef<IRider>[] = [
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
    id: "presentAddress",
    accessorKey: "presentAddress",
    enableSorting: false,
    header: "Present Address",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.presentAddress || "N/A"}
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
    id: "user.gender",
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {getCapitalized(row.original.user.gender || "N/A")}
      </span>
    ),
  },
  {
    id: "age",
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.age}</span>
    ),
  },
  {
    id: "cashInHand",
    accessorKey: "cashInHand",
    header: "Cash In Hand",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.cashInHand || "0"}
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
