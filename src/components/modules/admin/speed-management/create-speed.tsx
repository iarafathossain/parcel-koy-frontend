"use client";

import { createSpeedAction } from "@/actions/speed-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { catchError } from "@/helpers/catch-error";
import { createSpeedZodSchema } from "@/validators/speed-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CreateSpeedProps {
  onSuccess?: () => void;
}

const CreateSpeed = ({ onSuccess }: CreateSpeedProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [baseFee, setBaseFee] = useState<string>("");
  const [slaHours, setSlaHours] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSpeedAction,
  });

  const handleSubmit = async () => {
    setServerError(null);

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      baseFee: baseFee ? parseSingleNumber(baseFee) : undefined,
      slaHours: parseSingleNumber(slaHours),
      isActive,
    };

    const parsed = createSpeedZodSchema.safeParse(payload);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid payload";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Creating speed...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to create speed";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["speeds"] });
      toast.success(result.message || "Speed created successfully.");
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
          <Label htmlFor="speed-name">Speed Name</Label>
          <Input
            id="speed-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter speed name (e.g., Standard, Express)"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="speed-description">Description (Optional)</Label>
          <Textarea
            id="speed-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter speed description"
            disabled={isPending}
            rows={3}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="speed-sla-hours">SLA Hours</Label>
          <Input
            id="speed-sla-hours"
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
          <Label htmlFor="speed-base-fee">Base Fee (Optional)</Label>
          <Input
            id="speed-base-fee"
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

        <SubmitBtn isPending={isPending}>Create Speed</SubmitBtn>
      </Card>
    </form>
  );
};

export default CreateSpeed;
