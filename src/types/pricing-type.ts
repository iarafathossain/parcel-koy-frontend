export interface IDeliveryCharge {
  price: string;
}

export interface IPricingRule {
  id: string;
  originalZoneId: string;
  destinationZoneId: string;
  categoryId: string | null;
  speedId: string;
  pickupMethodId: string;
  deliveryMethodId: string;
  minWeight: number;
  maxWeight: number;
  price: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
