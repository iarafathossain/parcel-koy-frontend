import { ICategory } from "./category-type";
import { ParcelStatusType } from "./enum-type";
import { IMethod } from "./method-type";
import { ISpeed } from "./speed-type";
import { IUser } from "./user-type";

export type IParcel = {
  id: string;
  trackingId: string;
  status: ParcelStatusType;
  declaredWeight: number;
  actualWeight: number | null;
  isFragile: boolean;
  cancellationReason: string | null;
  cancelledAt: string | null;
  pickupFailedReason: string | null;
  deliveryFailedReason: string | null;
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverContactNumber: string;
  codAmount: string;
  deliveryCharge: string;
  merchantId: string;
  destinationAreaId: string;
  originAreaId: string;
  pickupRiderId: string | null;
  deliveryRiderId: string | null;
  originHubId: string | null;
  destinationHubId: string | null;
  createdAt: string;
  updatedAt: string;

  // relations
  merchant?: {
    id: string;
    businessName: string;
    user: {
      name: string;
      contactNumber: string;
    };
  };
  destinationArea?: {
    id: string;
    name: string;
  };
  originArea?: {
    id: string;
    name: string;
  };
  originHub?: {
    id: string;
    name: string;
  } | null;
  destinationHub?: {
    id: string;
    name: string;
  } | null;
  pickupRider?: {
    id: string;
    user?: {
      name: string;
    };
  } | null;
  deliveryRider?: {
    id: string;
    user?: {
      name: string;
    };
  } | null;
  category: ICategory;
  speed: ISpeed;
  pickupMethod: IMethod;
  deliveryMethod: IMethod;
  cancelledBy: IUser | null;
};
