"use client";

import { updateSpeedBySlugAction } from "@/actions/speed-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { catchError } from "@/helpers/catch-error";
import { ISpeed } from "@/types/speed-type";
import { updateSpeedZodSchema } from "@/validators/speed-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditSpeedProps {
  speed: ISpeed;
  onSuccess?: () => void;
}

const EditSpeed = ({ speed, onSuccess }: EditSpeedProps) => {
  const [name, setName] = useState<string>(speed.name);
  const [description, setDescription] = useState<string>(speed.description);
  const [baseFee, setBaseFee] = useState<string>(speed.baseFee);
  const [slaHours, setSlaHours] = useState<string>(String(speed.slaHours));
  const [isActive, setIsActive] = useState<boolean>(speed.isActive);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: Parameters<typeof updateSpeedBySlugAction>[1]) =>
      updateSpeedBySlugAction(speed.slug, payload),
  });

  const handleSubmit = async () => {
    setServerError(null);

    const payload = {
      name: name.trim() !== speed.name ? name.trim() : undefined,
      description:
        description.trim() !== speed.description
          ? description.trim() || undefined
          : undefined,
      baseFee:
        baseFee && parseSingleNumber(baseFee) !== parseFloat(speed.baseFee)
          ? parseSingleNumber(baseFee)
          : undefined,
      slaHours:
        parseSingleNumber(slaHours) !== speed.slaHours
          ? parseSingleNumber(slaHours)
          : undefined,
      isActive: isActive !== speed.isActive ? isActive : undefined,
    };

    const parsed = updateSpeedZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Updating speed...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to update speed";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["speeds"] });
      toast.success(result.message || "Speed updated successfully.");
      onSuccess?.();
    } catch (error: unknown) {
      const message = catchError(
        error,
        "An unexpected error occurred. Please try again.",
      );
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
          <Label htmlFor="edit-speed-name">Speed Name</Label>
          <Input
            id="edit-speed-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter speed name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-speed-description">Description (Optional)</Label>
          <Textarea
            id="edit-speed-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter speed description"
            disabled={isPending}
            rows={3}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-speed-sla-hours">SLA Hours</Label>
          <Input
            id="edit-speed-sla-hours"
            type="number"
            value={slaHours}
            onChange={(e) => setSlaHours(e.target.value)}
            placeholder="e.g., 24"
            step="1"
            min="1"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-speed-base-fee">Base Fee (Optional)</Label>
          <Input
            id="edit-speed-base-fee"
            type="number"
            value={baseFee}
            onChange={(e) => setBaseFee(e.target.value)}
            placeholder="e.g., 50"
            step="0.01"
            min="0"
            disabled={isPending}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isPending}
          />
          Active Speed
        </label>

        <SubmitBtn isPending={isPending}>Update Speed</SubmitBtn>
      </Card>
    </form>
  );
};

export default EditSpeed;
