"use client";

import { verifyDeliveryOtpAction } from "@/actions/rider-action";
import AppField from "@/components/shared/app-field";
import CommonModal from "@/components/shared/modal/common-modal";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { ParcelStatusType } from "@/types/enum-type";
import { IParcel } from "@/types/parcel-type";
import { ALLOWED_TRANSITIONS } from "@/validators/parcel-validator";
import { VerifyAndDeliverParcelPayload } from "@/validators/rider-validator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface VerifyDeliveryOtpProps {
  parcel: IParcel;
  isOpen: boolean;
  onClose: () => void;
}

const VerifyDeliveryOtp = ({
  parcel,
  isOpen,
  onClose,
}: VerifyDeliveryOtpProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Check if "DELIVERED" is an allowed transition from the current status
  const allowedStatuses = useMemo<string[]>(
    () => [...(ALLOWED_TRANSITIONS[parcel.status as ParcelStatusType] || [])],
    [parcel.status],
  );

  const canDeliver = allowedStatuses.includes("DELIVERED");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: VerifyAndDeliverParcelPayload) => {
      return await verifyDeliveryOtpAction(parcel.id, payload);
    },
  });

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setServerSuccess(null);

      if (!canDeliver) {
        setServerError(
          `Cannot process delivery from current status: ${parcel.status}.`,
        );
        return;
      }

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Invalid OTP. Please try again.");
          return;
        }

        setServerSuccess(
          result.message || "Parcel verified and delivered successfully.",
        );
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
      title="Verify Delivery"
      description={`Verify OTP for tracking ID: ${parcel.trackingId}`}
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

        {!canDeliver && !serverError && (
          <Alert variant="destructive">
            <AlertDescription>
              Delivery verification is not allowed for parcels currently marked
              as <strong>{parcel.status}</strong>. It must be in a state (e.g.,
              OUT_FOR_DELIVERY) that allows transitioning to DELIVERED.
            </AlertDescription>
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
          <form.Field
            name="otp"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "OTP is required"
                  : value.length < 4
                    ? "OTP is too short"
                    : undefined,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Customer OTP"
                type="text"
                placeholder="Enter OTP"
                disabled={isPending || !canDeliver}
              />
            )}
          </form.Field>

          <SubmitBtn
            isPending={isPending}
            disabled={!canDeliver}
            className="w-full"
          >
            Verify & Mark Delivered
          </SubmitBtn>
        </Card>
      </form>
    </CommonModal>
  );
};

export default VerifyDeliveryOtp;
