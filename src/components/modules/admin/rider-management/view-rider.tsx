import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IRider } from "@/types/user-type";

const ViewRider = ({ rider }: { rider: IRider }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Rider Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Full Name</p>
            <p className="text-sm font-medium">{rider.user.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email Address</p>
            <p className="text-sm font-medium">{rider.user.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact Number</p>
            <p className="text-sm font-medium">{rider.user.contactNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="text-sm font-medium">
              {getCapitalized(rider.user.gender)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Age</p>
            <p className="text-sm font-medium">{rider.age}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cash In Hand</p>
            <p className="text-sm font-medium">{rider.cashInHand || "0"}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Address Information
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Present Address</p>
            <p className="text-sm font-medium">
              {rider.presentAddress || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Permanent Address</p>
            <p className="text-sm font-medium">
              {rider.permanentAddress || "N/A"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Account Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              variant={rider.user.status === "ACTIVE" ? "default" : "secondary"}
              className="mt-1"
            >
              {rider.user.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email Verified</p>
            <Badge
              variant={rider.user.emailVerified ? "default" : "secondary"}
              className="mt-1"
            >
              {rider.user.emailVerified ? "Yes" : "No"}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="text-sm font-medium">{formatDate(rider.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-sm font-medium">{formatDate(rider.updatedAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewRider;
