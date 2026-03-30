import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IHub } from "@/types/hub-type";

const ViewHub = ({ hub }: { hub: IHub }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Hub Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="text-sm font-medium">{hub.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Slug</p>
            <p className="text-sm font-medium">{hub.slug}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm font-medium">{hub.address}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact Number</p>
            <p className="text-sm font-medium">{hub.contactNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              variant={hub.isActive ? "default" : "secondary"}
              className="mt-1"
            >
              {hub.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Manager ID</p>
            <p className="text-sm font-medium">{hub.managerId || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="text-sm font-medium">{formatDate(hub.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Updated At</p>
            <p className="text-sm font-medium">{formatDate(hub.updatedAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewHub;
