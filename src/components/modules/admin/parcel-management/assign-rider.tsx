"use client";

import { updateParcelStatusByAdminAction } from "@/actions/parcel-action";
import { getAllRidersAction } from "@/actions/rider-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { catchError } from "@/helpers/catch-error";
import { ParcelStatus, ParcelStatusType } from "@/types/enum-type";
import { IParcel } from "@/types/parcel-type";
import {
  ALLOWED_TRANSITIONS,
  UpdateParcelStatusByAdminPayload,
} from "@/validators/parcel-validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface AssignRiderProps {
  parcel: IParcel;
  onSuccess?: () => void;
}

const AssignRider = ({ parcel, onSuccess }: AssignRiderProps) => {
  const [pickupRiderId, setPickupRiderId] = useState<string>(
    parcel.pickupRiderId || "none",
  );
  const [deliveryRiderId, setDeliveryRiderId] = useState<string>(
    parcel.deliveryRiderId || "none",
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: ridersResponse, isLoading: isRidersLoading } = useQuery({
    queryKey: ["riders", "for-assign"],
    queryFn: () => getAllRidersAction(""),
  });

  const riders = ridersResponse?.data || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: UpdateParcelStatusByAdminPayload) => {
      return await updateParcelStatusByAdminAction(parcel.id, payload);
    },
  });

  const canAssignRider = Boolean(
    ALLOWED_TRANSITIONS[parcel.status as ParcelStatusType]?.some(
      (status) => status === ParcelStatus.PICKUP_RIDER_ASSIGNED,
    ),
  );

  const handleAssign = async () => {
    setServerError(null);
    setServerSuccess(null);

    if (!canAssignRider) {
      setServerError(
        `Cannot assign riders to parcel in ${parcel.status} status. Only parcels in REQUESTED status can have riders assigned.`,
      );
      return;
    }

    if (pickupRiderId === "none" && deliveryRiderId === "none") {
      setServerError("Select at least one rider to assign.");
      return;
    }

    const payload: UpdateParcelStatusByAdminPayload = {
      status: ParcelStatus.PICKUP_RIDER_ASSIGNED,
      pickupRiderId: pickupRiderId !== "none" ? pickupRiderId : undefined,
      deliveryRiderId: deliveryRiderId !== "none" ? deliveryRiderId : undefined,
    };

    try {
      const result = await mutateAsync(payload);

      if (!result.success) {
        setServerError(result.message || "Failed to assign rider.");
        return;
      }

      setServerSuccess(result.message || "Rider assigned successfully.");
      await queryClient.invalidateQueries({ queryKey: ["parcels"] });
      onSuccess?.();
    } catch (error: unknown) {
      setServerError(
        catchError(error, "An unexpected error occurred. Please try again."),
      );
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAssign();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      {serverSuccess && (
        <Alert>
          <AlertDescription>{serverSuccess}</AlertDescription>
        </Alert>
      )}

      <Card className="p-4 space-y-4">
        <p className="text-sm font-medium">Tracking: {parcel.trackingId}</p>
        <div className="text-xs text-gray-500">
          Current Status:{" "}
          <span className="font-semibold text-gray-700">{parcel.status}</span>
        </div>

        {!canAssignRider && (
          <Alert variant="destructive">
            <AlertDescription>
              Cannot assign riders to parcels in {parcel.status} status.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5">
          <p className="text-sm font-medium">Pickup Rider</p>
          <Select value={pickupRiderId} onValueChange={setPickupRiderId}>
            <SelectTrigger
              className="w-full"
              disabled={isPending || isRidersLoading}
            >
              <SelectValue placeholder="Assign pickup rider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Unassigned</SelectItem>
              {riders.map((rider) => (
                <SelectItem key={rider.id} value={rider.id}>
                  {rider.user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium">Delivery Rider</p>
          <Select value={deliveryRiderId} onValueChange={setDeliveryRiderId}>
            <SelectTrigger
              className="w-full"
              disabled={isPending || isRidersLoading}
            >
              <SelectValue placeholder="Assign delivery rider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Unassigned</SelectItem>
              {riders.map((rider) => (
                <SelectItem key={rider.id} value={rider.id}>
                  {rider.user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <SubmitBtn isPending={isPending} disabled={!canAssignRider}>
          Assign Rider
        </SubmitBtn>
      </Card>
    </form>
  );
};

export default AssignRider;
