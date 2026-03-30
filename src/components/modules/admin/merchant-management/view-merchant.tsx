import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IMerchant } from "@/types/user-type";

const ViewMerchant = ({ merchant }: { merchant: IMerchant }) => {
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
          Merchant Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Business Name</p>
            <p className="text-sm font-medium">{merchant.businessName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Owner Name</p>
            <p className="text-sm font-medium">{merchant.user.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email Address</p>
            <p className="text-sm font-medium">{merchant.user.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact Number</p>
            <p className="text-sm font-medium">{merchant.user.contactNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="text-sm font-medium">
              {getCapitalized(merchant.user.gender)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Origin Area</p>
            <p className="text-sm font-medium">{merchant.originArea?.name}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Pickup Details
        </h3>
        <div>
          <p className="text-xs text-muted-foreground">Pickup Address</p>
          <p className="text-sm font-medium">{merchant.pickupAddress}</p>
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
              variant={
                merchant.user.status === "ACTIVE" ? "default" : "secondary"
              }
              className="mt-1"
            >
              {merchant.user.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email Verified</p>
            <Badge
              variant={merchant.user.emailVerified ? "default" : "secondary"}
              className="mt-1"
            >
              {merchant.user.emailVerified ? "Yes" : "No"}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="text-sm font-medium">{merchant.balance || "0"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Credit Limit</p>
            <p className="text-sm font-medium">{merchant.creditLimit || "0"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="text-sm font-medium">
              {formatDate(merchant.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-sm font-medium">
              {formatDate(merchant.updatedAt)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewMerchant;
