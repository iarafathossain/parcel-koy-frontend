import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IZone } from "@/types/zone-type";

const ViewZone = ({ zone }: { zone: IZone }) => {
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
          Zone Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="text-sm font-medium">{zone.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Slug</p>
            <p className="text-sm font-medium">{zone.slug}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Coverage</p>
            <Badge
              variant={zone.isInsideDhaka ? "default" : "secondary"}
              className="mt-1"
            >
              {zone.isInsideDhaka ? "Inside Dhaka" : "Outside Dhaka"}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              variant={zone.isActive ? "default" : "secondary"}
              className="mt-1"
            >
              {zone.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="text-sm font-medium">{formatDate(zone.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Updated At</p>
            <p className="text-sm font-medium">{formatDate(zone.updatedAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewZone;
