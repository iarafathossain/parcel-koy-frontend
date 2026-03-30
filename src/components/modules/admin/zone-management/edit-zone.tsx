"use client";

import { updateZoneBySlugAction } from "@/actions/zone-action";
import SubmitBtn from "@/components/shared/submit-btn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchError } from "@/helpers/catch-error";
import { IZone } from "@/types/zone-type";
import { updateZoneZodSchema } from "@/validators/zone-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditZoneProps {
  zone: IZone;
  onSuccess?: () => void;
}

const EditZone = ({ zone, onSuccess }: EditZoneProps) => {
  const [name, setName] = useState<string>(zone.name);
  const [isActive, setIsActive] = useState<boolean>(zone.isActive);
  const [isInsideDhaka, setIsInsideDhaka] = useState<boolean>(
    zone.isInsideDhaka,
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: {
      name?: string;
      isActive?: boolean;
      isInsideDhaka?: boolean;
    }) => {
      return await updateZoneBySlugAction(zone.slug, payload);
    },
  });

  const handleSubmit = async () => {
    setServerError(null);

    const payload = {
      name: name.trim(),
      isActive,
      isInsideDhaka,
    };

    const parsed = updateZoneZodSchema.safeParse(payload);
    if (!parsed.success) {
      setServerError(parsed.error.issues[0]?.message || "Invalid payload");
      return;
    }

    const toastId = toast.loading("Updating zone...");

    try {
      const result = await mutateAsync(parsed.data);

      if (!result.success) {
        const message = result.message || "Failed to update zone";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success(result.message || "Zone updated successfully.");
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
          <Label htmlFor="zone-name">Zone Name</Label>
          <Input
            id="zone-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter zone name"
            disabled={isPending}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isInsideDhaka}
            onCheckedChange={(checked) => setIsInsideDhaka(checked === true)}
            disabled={isPending}
          />
          Inside Dhaka
        </label>

        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isPending}
          />
          Active Zone
        </label>

        <SubmitBtn isPending={isPending}>Update Zone</SubmitBtn>
      </Card>
    </form>
  );
};

export default EditZone;
