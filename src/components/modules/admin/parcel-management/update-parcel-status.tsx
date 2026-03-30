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
import { ParcelStatusType } from "@/types/enum-type";
import { IParcel } from "@/types/parcel-type";
import {
  ALLOWED_TRANSITIONS,
  UpdateParcelStatusByAdminPayload,
  updateParcelStatusByAdminZodSchema,
} from "@/validators/parcel-validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface UpdateParcelStatusProps {
  parcel: IParcel;
  onSuccess?: () => void;
}

const UpdateParcelStatus = ({ parcel, onSuccess }: UpdateParcelStatusProps) => {
  const allowedStatuses = useMemo<string[]>(
    () => [...(ALLOWED_TRANSITIONS[parcel.status as ParcelStatusType] || [])],
    [parcel.status],
  );

  const [status, setStatus] = useState<string>(
    allowedStatuses.length > 0 ? String(allowedStatuses[0]) : parcel.status,
  );
  const [pickupRiderId, setPickupRiderId] = useState<string>(
    parcel.pickupRiderId || "none",
  );
  const [deliveryRiderId, setDeliveryRiderId] = useState<string>(
    parcel.deliveryRiderId || "none",
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [transitionError, setTransitionError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const isTerminalStatus = allowedStatuses.length === 0;

  const { data: ridersResponse, isLoading: isRidersLoading } = useQuery({
    queryKey: ["riders", "for-parcel-status"],
    queryFn: () => getAllRidersAction(""),
  });

  const riders = ridersResponse?.data || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: UpdateParcelStatusByAdminPayload) => {
      return await updateParcelStatusByAdminAction(parcel.id, payload);
    },
  });

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setTransitionError(null);
  };

  const handleSubmit = async () => {
    setServerError(null);
    setServerSuccess(null);
    setTransitionError(null);

    // Validate transition
    if (!allowedStatuses.includes(status)) {
      setTransitionError(
        `Cannot transition from ${parcel.status} to ${status}. Allowed transitions: ${allowedStatuses.join(", ") || "None (terminal status)"}`,
      );
      return;
    }

    // Validate required riders based on status
    if (status === "PICKUP_RIDER_ASSIGNED" && pickupRiderId === "none") {
      setServerError(
        "Pickup rider ID is required when assigning a pickup rider",
      );
      return;
    }

    if (status === "OUT_FOR_DELIVERY" && deliveryRiderId === "none") {
      setServerError(
        "Delivery rider ID is required when assigning out for delivery",
      );
      return;
    }

    const payload: UpdateParcelStatusByAdminPayload = {
      status: status as UpdateParcelStatusByAdminPayload["status"],
      pickupRiderId: pickupRiderId !== "none" ? pickupRiderId : undefined,
      deliveryRiderId: deliveryRiderId !== "none" ? deliveryRiderId : undefined,
    };

    const parsed = updateParcelStatusByAdminZodSchema.safeParse(payload);

    if (!parsed.success) {
      setServerError(parsed.error.issues[0]?.message || "Invalid payload");
      return;
    }

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        setServerError(result.message || "Failed to update parcel status.");
        return;
      }

      setServerSuccess(result.message || "Parcel status updated successfully.");
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
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {transitionError && (
        <Alert variant="destructive">
          <AlertDescription>{transitionError}</AlertDescription>
        </Alert>
      )}

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

        {isTerminalStatus && (
          <Alert>
            <AlertDescription className="text-yellow-800 bg-yellow-50">
              This parcel is in a terminal status and cannot be modified.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5">
          <p className="text-sm font-medium">Status</p>
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={isPending || isTerminalStatus}
          >
            <SelectTrigger
              className="w-full"
              disabled={isPending || isTerminalStatus}
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {allowedStatuses.map((statusValue) => (
                <SelectItem key={statusValue} value={statusValue}>
                  {statusValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {allowedStatuses.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Allowed transitions: {allowedStatuses.join(", ")}
            </p>
          )}
        </div>

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

        <SubmitBtn isPending={isPending} disabled={isTerminalStatus}>
          Update Status
        </SubmitBtn>
      </Card>
    </form>
  );
};

export default UpdateParcelStatus;
