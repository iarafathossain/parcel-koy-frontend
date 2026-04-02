"use client";

import { updateParcelByIdAction } from "@/actions/parcel-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchError } from "@/helpers/catch-error";
import { parseNumber } from "@/helpers/parse-number";
import { IParcel } from "@/types/parcel-type";
import { updateParcelZodSchema } from "@/validators/parcel-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditParcelProps {
  parcel: IParcel;
  onSuccess?: () => void;
}

const EditParcel = ({ parcel, onSuccess }: EditParcelProps) => {
  const [receiverName, setReceiverName] = useState(parcel.receiverName);
  const [receiverContactNumber, setReceiverContactNumber] = useState(
    parcel.receiverContactNumber,
  );
  const [pickupAddress, setPickupAddress] = useState(parcel.pickupAddress);
  const [deliveryAddress, setDeliveryAddress] = useState(
    parcel.deliveryAddress,
  );
  const [declaredWeight, setDeclaredWeight] = useState(
    String(parcel.declaredWeight),
  );
  const [isFragile, setIsFragile] = useState(parcel.isFragile);
  const [serverError, setServerError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: Parameters<typeof updateParcelByIdAction>[1]) =>
      updateParcelByIdAction(parcel.id, payload),
  });

  const handleSubmit = async () => {
    setServerError(null);

    const weightParsed = parseNumber(declaredWeight, "Declared weight");
    if (weightParsed.error || weightParsed.value === null) {
      setServerError(weightParsed.error || "Invalid declared weight");
      return;
    }

    const payload = {
      receiverName:
        receiverName.trim() !== parcel.receiverName
          ? receiverName.trim()
          : undefined,
      receiverContactNumber:
        receiverContactNumber.trim() !== parcel.receiverContactNumber
          ? receiverContactNumber.trim()
          : undefined,
      pickupAddress:
        pickupAddress.trim() !== parcel.pickupAddress
          ? pickupAddress.trim()
          : undefined,
      deliveryAddress:
        deliveryAddress.trim() !== parcel.deliveryAddress
          ? deliveryAddress.trim()
          : undefined,
      declaredWeight:
        weightParsed.value !== parcel.declaredWeight
          ? weightParsed.value
          : undefined,
      isFragile: isFragile !== parcel.isFragile ? isFragile : undefined,
    };

    const parsed = updateParcelZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const hasChanges = Object.values(parsed.data).some(
      (value) => value !== undefined,
    );

    if (!hasChanges) {
      toast.error("No changes detected.");
      return;
    }

    const toastId = toast.loading("Updating parcel...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to update parcel";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["parcels"] });
      toast.success(result.message || "Parcel updated successfully.");
      onSuccess?.();
    } catch (error: unknown) {
      const message = catchError(error, "Failed to update parcel.");
      setServerError(message);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Card className="p-4 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="edit-receiver-name">Receiver Name</Label>
          <Input
            id="edit-receiver-name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-receiver-contact">Receiver Contact Number</Label>
          <Input
            id="edit-receiver-contact"
            value={receiverContactNumber}
            onChange={(e) => setReceiverContactNumber(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-pickup-address">Pickup Address</Label>
          <Input
            id="edit-pickup-address"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-delivery-address">Delivery Address</Label>
          <Input
            id="edit-delivery-address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-declared-weight">Declared Weight (kg)</Label>
          <Input
            id="edit-declared-weight"
            type="number"
            value={declaredWeight}
            onChange={(e) => setDeclaredWeight(e.target.value)}
            min="0"
            step="0.01"
            disabled={isPending}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isFragile}
            onCheckedChange={(checked) => setIsFragile(checked === true)}
            disabled={isPending}
          />
          Fragile Parcel
        </label>

        <SubmitBtn isPending={isPending}>Update Parcel</SubmitBtn>
      </Card>
    </form>
  );
};

export default EditParcel;
