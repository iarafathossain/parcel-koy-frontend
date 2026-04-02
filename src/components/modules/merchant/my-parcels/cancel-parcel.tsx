"use client";

import { cancelParcelByMerchantAction } from "@/actions/parcel-action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { catchError } from "@/helpers/catch-error";
import { IParcel } from "@/types/parcel-type";
import { cancelParcelByMerchantZodSchema } from "@/validators/parcel-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CancelParcelProps {
  parcel: IParcel;
  onSuccess?: () => void;
}

const CancelParcel = ({ parcel, onSuccess }: CancelParcelProps) => {
  const [cancellationReason, setCancellationReason] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: Parameters<typeof cancelParcelByMerchantAction>[1]) =>
      cancelParcelByMerchantAction(parcel.id, payload),
  });

  const handleCancel = async () => {
    setServerError(null);

    const payload = {
      cancellationReason:
        cancellationReason.trim().length > 0
          ? cancellationReason.trim()
          : undefined,
    };

    const parsed = cancelParcelByMerchantZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Cancelling parcel...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to cancel parcel";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["parcels"] });
      toast.success(result.message || "Parcel cancelled successfully.");
      onSuccess?.();
    } catch (error: unknown) {
      const message = catchError(error, "Failed to cancel parcel.");
      setServerError(message);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Cancel parcel{" "}
          <span className="font-semibold">{parcel.trackingId}</span>?
        </p>
        <p className="text-xs text-muted-foreground">
          You can only cancel a parcel before pickup.
        </p>
      </div>

      <Textarea
        value={cancellationReason}
        onChange={(e) => setCancellationReason(e.target.value)}
        placeholder="Enter cancellation reason (optional)"
        disabled={isPending}
      />

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => onSuccess?.()}
          disabled={isPending}
        >
          Close
        </Button>
        <Button
          variant="destructive"
          onClick={handleCancel}
          disabled={isPending}
        >
          {isPending ? "Cancelling..." : "Confirm Cancel"}
        </Button>
      </div>
    </Card>
  );
};

export default CancelParcel;
