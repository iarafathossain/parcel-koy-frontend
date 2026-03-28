import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IAdmin } from "@/types/user-type";

const ViewAdmin = ({ admin }: { admin: IAdmin }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* User Information */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          User Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Full Name</p>
            <p className="text-sm font-medium">{admin.user.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email Address</p>
            <p className="text-sm font-medium">{admin.user.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact Number</p>
            <p className="text-sm font-medium">{admin.user.contactNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="text-sm font-medium">
              {getCapitalized(admin.user.gender)}
            </p>
          </div>
        </div>
      </Card>

      {/* Address Information */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Address Information
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Present Address</p>
            <p className="text-sm font-medium">
              {admin.presentAddress || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Permanent Address</p>
            <p className="text-sm font-medium">
              {admin.permanentAddress || "N/A"}
            </p>
          </div>
        </div>
      </Card>

      {/* Account Status */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Account Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              variant={admin.user.status === "ACTIVE" ? "default" : "secondary"}
              className="mt-1"
            >
              {admin.user.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email Verified</p>
            <Badge
              variant={admin.user.emailVerified ? "default" : "secondary"}
              className="mt-1"
            >
              {admin.user.emailVerified ? "Yes" : "No"}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="text-sm font-medium">{formatDate(admin.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-sm font-medium">{formatDate(admin.updatedAt)}</p>
          </div>
        </div>
      </Card>

      {/* Managed Hubs */}
      {admin.managedHubs && admin.managedHubs.length > 0 && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Managed Hubs
          </h3>
          <div className="flex flex-wrap gap-2">
            {admin.managedHubs.map((hub) => (
              <Badge key={hub.id} variant="outline">
                {hub.name}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ViewAdmin;
