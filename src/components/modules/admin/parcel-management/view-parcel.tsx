import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IParcel } from "@/types/parcel-type";

const ViewParcel = ({ parcel }: { parcel: IParcel }) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Parcel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Tracking ID</p>
            <p className="text-sm font-medium">{parcel.trackingId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant="outline" className="mt-1">
              {getCapitalized(parcel.status.replace(/_/g, " "))}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-sm font-medium">
              {parcel.category?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">COD Amount</p>
            <p className="text-sm font-medium">
              {formatPrice(Number(parcel.codAmount || 0))}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Receiver</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="text-sm font-medium">{parcel.receiverName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">
              {parcel.receiverContactNumber}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-muted-foreground">Delivery Address</p>
            <p className="text-sm font-medium">{parcel.deliveryAddress}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Routing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Origin Area</p>
            <p className="text-sm font-medium">
              {parcel.originArea?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Destination Area</p>
            <p className="text-sm font-medium">
              {parcel.destinationArea?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Origin Hub</p>
            <p className="text-sm font-medium">
              {parcel.originHub?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Destination Hub</p>
            <p className="text-sm font-medium">
              {parcel.destinationHub?.name || "N/A"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewParcel;
