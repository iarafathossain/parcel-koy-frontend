"use client";

import { updateParcelStatusByRiderAction } from "@/actions/rider-action";
import CommonModal from "@/components/shared/modal/common-modal";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { ALLOWED_TRANSITIONS } from "@/validators/parcel-validator";
import { UpdateParcelStatusByRiderPayload } from "@/validators/rider-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface UpdateParcelStatusProps {
  parcel: IParcel;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateParcelStatus = ({
  parcel,
  isOpen,
  onClose,
}: UpdateParcelStatusProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const allowedStatuses = useMemo<string[]>(
    () => [...(ALLOWED_TRANSITIONS[parcel.status as ParcelStatusType] || [])],
    [parcel.status],
  );

  const isTerminalStatus = allowedStatuses.length === 0;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: UpdateParcelStatusByRiderPayload) => {
      return await updateParcelStatusByRiderAction(parcel.id, payload);
    },
  });

  const form = useForm({
    defaultValues: {
      status: allowedStatuses.length > 0 ? allowedStatuses[0] : parcel.status,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      if (!allowedStatuses.includes(value.status)) {
        setServerError(
          `Cannot transition from ${parcel.status} to ${value.status}.`,
        );
        return;
      }

      try {
        const result = await mutateAsync(
          value as UpdateParcelStatusByRiderPayload,
        );
        if (!result.success) {
          setServerError(result.message || "Failed to update parcel status.");
          return;
        }

        setServerSuccess(result.message || "Status updated successfully.");
        await queryClient.invalidateQueries({
          queryKey: ["my-assigned-parcels"],
        });

        setTimeout(() => onClose(), 1500);
      } catch (error: unknown) {
        setServerError(catchError(error, "An unexpected error occurred."));
      }
    },
  });

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Parcel Status"
      description={`Update status for tracking ID: ${parcel.trackingId}`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
        {serverSuccess && (
          <Alert>
            <AlertDescription className="text-green-600">
              {serverSuccess}
            </AlertDescription>
          </Alert>
        )}

        <Card className="p-4 space-y-4 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-medium">Tracking: {parcel.trackingId}</p>
            <div className="text-xs text-gray-500">
              Current Status:{" "}
              <span className="font-semibold text-gray-700">
                {parcel.status}
              </span>
            </div>
          </div>

          {isTerminalStatus && (
            <Alert>
              <AlertDescription className="text-yellow-800 bg-yellow-50">
                This parcel is in a terminal status and cannot be modified.
              </AlertDescription>
            </Alert>
          )}

          <form.Field name="status">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>New Status</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  disabled={isPending || isTerminalStatus}
                >
                  <SelectTrigger
                    className="w-full"
                    disabled={isPending || isTerminalStatus}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace(/_/g, " ")}
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
            )}
          </form.Field>

          <SubmitBtn
            isPending={isPending}
            disabled={isTerminalStatus}
            className="w-full"
          >
            Update Status
          </SubmitBtn>
        </Card>
      </form>
    </CommonModal>
  );
};

export default UpdateParcelStatus;
