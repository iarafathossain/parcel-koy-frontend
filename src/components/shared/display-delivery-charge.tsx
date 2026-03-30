import { getDeliveryChargeAction } from "@/actions/pricing-action";
import { formatPrice } from "@/helpers/format-price";
import { parseNumber } from "@/helpers/parse-number";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type DeliveryChargeDisplayProps = {
  values: {
    categoryId: string;
    destinationAreaId: string;
    speedId: string;
    deliveryMethodId: string;
    declaredWeight: string;
    originAreaId?: string;
  };
  pickupMethodId: string;
  requiresPickupLocation: boolean;
  defaultOriginAreaId?: string;
};

const DeliveryChargeDisplay = ({
  values,
  pickupMethodId,
  requiresPickupLocation,
  defaultOriginAreaId,
}: DeliveryChargeDisplayProps) => {
  const parsedWeight = parseNumber(values.declaredWeight, "Declared weight");

  // 1. Check if we have a valid origin ONLY if the method requires it
  const hasValidOrigin = requiresPickupLocation
    ? Boolean(values.originAreaId)
    : true; // Automatically pass the check for regular-pickup

  // 2. Determine which ID to send to the backend (if any)
  const finalOriginAreaId = requiresPickupLocation
    ? values.originAreaId
    : defaultOriginAreaId;

  // 3. Now the boolean logic won't block regular pickups
  const hasRequiredFields = Boolean(
    values.categoryId &&
    values.destinationAreaId &&
    values.speedId &&
    values.deliveryMethodId &&
    hasValidOrigin && // <-- This is the crucial fix
    parsedWeight.value !== null,
  );

  const {
    data: chargeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "delivery-charge",
      values.categoryId,
      values.destinationAreaId,
      values.speedId,
      values.deliveryMethodId,
      pickupMethodId,
      finalOriginAreaId, // Keeps the query key stable
      parsedWeight.value,
    ],
    queryFn: () =>
      getDeliveryChargeAction({
        categoryId: values.categoryId,
        destinationAreaId: values.destinationAreaId,
        speedId: values.speedId,
        deliveryMethodId: values.deliveryMethodId,
        pickupMethodId: pickupMethodId,
        weight: parsedWeight.value as number,
        // 4. Only attach the originAreaId to the payload if it actually exists
        ...(finalOriginAreaId ? { originAreaId: finalOriginAreaId } : {}),
      }),
    enabled: hasRequiredFields,
  });

  if (!hasRequiredFields) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-2">
      <div className="text-sm font-medium text-muted-foreground flex flex-col">
        <span> Delivery Charge based on declared weight</span>
        <span>
          If Actual weight is different, the charge will be adjusted
          accordingly.
        </span>
      </div>
      <div className="text-right">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : isError ? (
          <span className="text-sm font-medium text-destructive">
            Unavailable
          </span>
        ) : (
          <span className="text-xl font-bold tracking-tight">
            {formatPrice(Number(chargeData?.data?.price || 0))}
          </span>
        )}
      </div>
    </div>
  );
};

export default DeliveryChargeDisplay;
