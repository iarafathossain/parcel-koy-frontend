import { semanticTones } from "@/components/shared/semantic-tones";
import {
  Bike,
  CheckCircle2,
  MapPin,
  MapPinHouse,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";

export interface TrackingTimelineEntry {
  id: string;
  status: string;
  description: string;
  createdAt: string;
  userId: string | null;
  hubId: string | null;
  hub: {
    id: string;
    name: string;
    address: string;
    contactNumber: string;
  } | null;
}

export interface TrackingData {
  parcelId: string;
  trackingId: string;
  status: string;
  currentHub: {
    id: string;
    name: string;
    address: string;
    contactNumber: string;
  } | null;
  originHub: {
    id: string;
    name: string;
    address: string;
    contactNumber: string;
  } | null;
  destinationHub: {
    id: string;
    name: string;
    address: string;
    contactNumber: string;
  } | null;
  trackingTimeline: TrackingTimelineEntry[];
}

export interface TrackingApiResponse {
  success: boolean;
  message: string;
  data: TrackingData;
}

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "REQUESTED":
      return {
        icon: Package,
        color: semanticTones.info.soft,
      };
    case "PICKUP_RIDER_ASSIGNED":
    case "OUT_FOR_DELIVERY":
      return {
        icon: Bike,
        color: semanticTones.warning.soft,
      };
    case "PICKED_UP":
      return {
        icon: CheckCircle2,
        color: semanticTones.success.soft,
      };
    case "RECEIVED_AT_ORIGIN_HUB":
    case "RECEIVED_AT_DESTINATION_HUB":
      return {
        icon: MapPinHouse,
        color: semanticTones.secondary.soft,
      };
    case "IN_TRANSIT":
      return {
        icon: Truck,
        color: semanticTones.info.soft,
      };
    case "DELIVERED":
      return {
        icon: PackageCheck,
        color: semanticTones.success.soft,
      };
    default:
      return {
        icon: MapPin,
        color: semanticTones.muted.soft,
      };
  }
};

export const getStatusBadgeVariant = (status: string) => {
  if (status === "DELIVERED") {
    return "default";
  }
  return "secondary";
};
