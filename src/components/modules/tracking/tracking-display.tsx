"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrackingData,
  getStatusBadgeVariant,
  getStatusConfig,
} from "@/lib/tracking-utils";
import { format } from "date-fns";
import { ArrowRight, Clock, MapPin, MapPinHouse, Phone } from "lucide-react";

interface TrackingDisplayProps {
  data: TrackingData;
}

export const TrackingDisplay = ({ data }: TrackingDisplayProps) => {
  const sortedTimeline = [...data.trackingTimeline].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="max-w-4xl mx-auto pad-responsive-section space-y-generous">
      {/* Header Info Card */}
      <Card className="border-none shadow-md bg-card">
        <CardContent className="pad-expanded sm:pad-loose flex flex-col sm:flex-row justify-between items-start sm:items-center gap-generous sm:gap-standard">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Tracking ID
            </p>
            <h1 className="heading-h2 tracking-tight text-primary">
              {data.trackingId}
            </h1>

            {/* Origin -> Destination Route Overview */}
            {(data.originHub || data.destinationHub) && (
              <div className="flex items-center gap-default mt-standard text-sm bg-muted/40 pad-compact radius-sm w-fit border border-border/50">
                {data.originHub && (
                  <div className="flex items-center gap-standard font-medium text-foreground">
                    <MapPinHouse className="w-4 h-4 text-muted-foreground" />
                    {data.originHub.name}
                  </div>
                )}
                {data.originHub && data.destinationHub && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                {data.destinationHub && (
                  <div className="flex items-center gap-standard font-medium text-foreground">
                    <MapPinHouse className="w-4 h-4 text-muted-foreground" />
                    {data.destinationHub.name}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-left sm:text-right space-y-default">
            <p className="body-secondary font-medium text-muted-foreground uppercase tracking-wider">
              Current Status
            </p>
            <Badge
              variant={getStatusBadgeVariant(data.status)}
              className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {data.status.replace(/_/g, " ")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-muted/20 pad-responsive-content">
          <CardTitle className="flex items-center gap-standard heading-h5">
            <Clock className="w-5 h-5 text-primary" />
            Tracking History
          </CardTitle>
        </CardHeader>
        <CardContent className="pad-expanded sm:pad-loose">
          <div className="relative border-l-2 border-muted-foreground/20 ml-3 space-y-generous">
            {sortedTimeline.map((event, index) => {
              const { icon: IconComponent, color } = getStatusConfig(
                event.status,
              );
              const isLatest = index === 0;

              return (
                <div key={event.id} className="relative pl-8 sm:pl-10">
                  <div
                    className={`absolute -left-4.25 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background shadow-sm ${color}`}
                  >
                    <IconComponent className="w-5 h-5" />
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
                        <div className="flex flex-col gap-default text-sm bg-muted/30 pad-compact radius-sm border border-border/50 max-w-md">
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

export default TrackingDisplay;
