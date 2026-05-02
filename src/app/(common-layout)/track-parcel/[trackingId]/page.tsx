import { semanticTones } from "@/components/shared/semantic-tones";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API } from "@/lib/api-endpoints";
import { IHub } from "@/types/hub-type";
import { format } from "date-fns";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  MapPinHouse,
  Package,
  PackageCheck,
  Phone,
  Truck,
} from "lucide-react";

interface TrackingTimelineEntry {
  id: string;
  status: string;
  description: string;
  createdAt: string;
  userId: string | null;
  hubId: string | null;
  hub: IHub | null;
}

interface TrackingData {
  parcelId: string;
  trackingId: string;
  status: string;
  currentHub: IHub | null;
  originHub: IHub | null;
  destinationHub: IHub | null;
  trackingTimeline: TrackingTimelineEntry[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: TrackingData;
}

async function getTrackingData(
  trackingId: string,
): Promise<ApiResponse | null> {
  try {
    const res = await fetch(API.PARCELS.GET_PARCEL_TRACKING(trackingId), {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tracking data", error);
    return null;
  }
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "REQUESTED":
      return {
        icon: <Package className="w-5 h-5" />,
        color: semanticTones.info.soft,
      };
    case "PICKUP_RIDER_ASSIGNED":
    case "OUT_FOR_DELIVERY":
      return {
        icon: <Bike className="w-5 h-5" />,
        color: semanticTones.warning.soft,
      };
    case "PICKED_UP":
      return {
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: semanticTones.success.soft,
      };
    case "RECEIVED_AT_ORIGIN_HUB":
    case "RECEIVED_AT_DESTINATION_HUB":
      return {
        icon: <MapPinHouse className="w-5 h-5" />,
        color: semanticTones.secondary.soft,
      };
    case "IN_TRANSIT":
      return {
        icon: <Truck className="w-5 h-5" />,
        color: semanticTones.info.soft,
      };
    case "DELIVERED":
      return {
        icon: <PackageCheck className="w-5 h-5" />,
        color: semanticTones.success.soft,
      };
    default:
      return {
        icon: <MapPin className="w-5 h-5" />,
        color: semanticTones.muted.soft,
      };
  }
};

const TrackParcelByIdPage = async ({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) => {
  const { trackingId } = await params;
  const response = await getTrackingData(trackingId);

  if (!response?.success || !response.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Package className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold tracking-tight">Parcel Not Found</h2>
        <p className="text-muted-foreground mt-2">
          We couldn&apos;t find any tracking information for ID:{" "}
          <span className="font-semibold">{trackingId}</span>
        </p>
      </div>
    );
  }

  const { data } = response;
  const sortedTimeline = [...data.trackingTimeline].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Info Card */}
      <Card className="border-none shadow-md bg-card">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Tracking ID
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              {data.trackingId}
            </h1>

            {/* Origin -> Destination Route Overview */}
            {(data.originHub || data.destinationHub) && (
              <div className="flex items-center gap-3 mt-4 text-sm bg-muted/40 p-2.5 rounded-md w-fit border border-border/50">
                {data.originHub && (
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <MapPinHouse className="w-4 h-4 text-muted-foreground" />
                    {data.originHub.name}
                  </div>
                )}
                {data.originHub && data.destinationHub && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                {data.destinationHub && (
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <MapPinHouse className="w-4 h-4 text-muted-foreground" />
                    {data.destinationHub.name}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-left sm:text-right space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Current Status
            </p>
            <Badge
              variant={data.status === "DELIVERED" ? "default" : "secondary"}
              className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {data.status.replace(/_/g, " ")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="w-5 h-5 text-primary" />
            Tracking History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="relative border-l-2 border-muted-foreground/20 ml-3 space-y-8">
            {sortedTimeline.map((event, index) => {
              const { icon, color } = getStatusConfig(event.status);
              const isLatest = index === 0;

              return (
                <div key={event.id} className="relative pl-8 sm:pl-10">
                  <div
                    className={`absolute -left-4.25 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background shadow-sm ${color}`}
                  >
                    {icon}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                    <div className="space-y-1.5 flex-1">
                      <h3
                        className={`font-semibold tracking-tight ${isLatest ? "text-foreground text-lg" : "text-foreground/80"}`}
                      >
                        {event.status.replace(/_/g, " ")}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-snug max-w-lg">
                        {event.description}
                      </p>

                      {/* Hub Details Box (Renders only if event.hub is not null) */}
                      {event.hub && (
                        <div className="mt-3 flex flex-col gap-1 text-sm bg-muted/30 p-3 rounded-md border border-border/50 max-w-md">
                          <div className="flex items-center gap-2 font-medium text-foreground">
                            <MapPinHouse className="w-4 h-4 text-primary" />
                            {event.hub.name}
                          </div>
                          <div className="flex items-start gap-2 text-muted-foreground mt-1">
                            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span className="text-xs leading-relaxed">
                              {event.hub.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span className="text-xs font-mono">
                              {event.hub.contactNumber}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-muted/50 px-2.5 py-1 rounded-md w-fit h-fit mt-1 sm:mt-0">
                      {format(
                        new Date(event.createdAt),
                        "dd MMM yyyy, hh:mm a",
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackParcelByIdPage;
