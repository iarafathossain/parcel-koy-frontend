import DateCell from "@/components/shared/cell/date-cell";
import StatusBadgeCell from "@/components/shared/cell/status-badge-cell";
import UserInfoCell from "@/components/shared/cell/user-info";
import { Badge } from "@/components/ui/badge";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IAdmin } from "@/types/user-type";
import { ColumnDef } from "@tanstack/react-table";

export const adminColumns: ColumnDef<IAdmin>[] = [
  // id or accessorKey is same as the key in the data
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
    id: "user.email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.user.email}
      </span>
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
    id: "managedHubs",
    accessorKey: "managedHubs",
    enableSorting: false,
    header: "Managed Hubs",
    cell: ({ row }) => {
      const managedHubs = row.original.managedHubs;

      if (!managedHubs || managedHubs.length === 0) {
        return (
          <span className="text-xs text-muted-foreground">No Managed Hubs</span>
        );
      }

      return (
        <div>
          {managedHubs.map((hub, id) => {
            const name = hub.name || "N/A";
            return (
              <Badge variant={"secondary"} key={id}>
                {name}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    enableSorting: false,
    header: "Contact Number",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            {row.original?.user.contactNumber || "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    id: "user.gender",
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground text-capitalize">
        {getCapitalized(row.original?.user.gender || "N/A")}
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
    id: "user.createdAt",
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
