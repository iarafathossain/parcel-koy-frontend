import { getDeliveryChargeAction } from "@/actions/pricing-action";
import { getUserInfoAction } from "@/actions/user-action"; // Adjust the import path as needed
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
  // Removed defaultOriginAreaId from props
};

const DeliveryChargeDisplay = ({
  values,
  pickupMethodId,
  requiresPickupLocation,
}: DeliveryChargeDisplayProps) => {
  const parsedWeight = parseNumber(values.declaredWeight, "Declared weight");

  // 1. Fetch user info to get the merchant's default origin area
  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfoAction(),
    staleTime: 1000 * 60 * 5,
  });

  // Safely extract the default area ID
  const defaultOriginAreaId = userInfo?.merchantProfile?.originArea?.id || "";

  // 2. Determine the correct origin area to use
  const activeOriginAreaId = requiresPickupLocation
    ? values.originAreaId
    : defaultOriginAreaId;

  // 3. Check if we have a valid origin (either from the form or from the user profile)
  const hasValidOrigin = Boolean(activeOriginAreaId);

  // 4. Ensure ALL required fields are present before querying the price
  const hasRequiredFields = Boolean(
    values.categoryId &&
    values.destinationAreaId &&
    values.speedId &&
    values.deliveryMethodId &&
    hasValidOrigin &&
    parsedWeight.value !== null,
  );

  const {
    data: chargeData,
    isLoading: isChargeLoading,
    isError,
  } = useQuery({
    queryKey: [
      "delivery-charge",
      values.categoryId,
      values.destinationAreaId,
      values.speedId,
      values.deliveryMethodId,
      pickupMethodId,
      activeOriginAreaId,
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
        originAreaId: activeOriginAreaId,
      }),
    enabled: hasRequiredFields,
  });

  // If we don't have all fields yet, just hide the component
  if (!hasRequiredFields) return null;

  return (
    <div className="mt-6 flex items-center justify-between rounded-lg border bg-muted/40 p-4">
      <div className="text-sm font-medium text-muted-foreground flex flex-col">
        <span> Delivery Charge based on declared weight</span>
        <span>
          If Actual weight is different, the charge will be adjusted
          accordingly.
        </span>
      </div>
      <div className="text-right">
        {isChargeLoading || isUserLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : isError ? (
          <span className="text-sm font-medium text-destructive">
            Unavailable
          </span>
        ) : (
          <span className="text-xl font-bold tracking-tight">
            ৳{chargeData?.data?.price || 0}
          </span>
        )}
      </div>
    </div>
  );
};

export default DeliveryChargeDisplay;
