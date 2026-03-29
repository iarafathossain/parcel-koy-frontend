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
  createdAt: string;
  updatedAt: string;

  // relations
  category: ICategory;
  speed: ISpeed;
  pickupMethod: IMethod;
  deliveryMethod: IMethod;
  cancelledBy: IUser | null;
};
