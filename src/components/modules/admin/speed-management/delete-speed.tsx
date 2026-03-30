"use client";

import { deleteSpeedBySlugAction } from "@/actions/speed-action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { ISpeed } from "@/types/speed-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteSpeedProps {
  speed: ISpeed;
  onSuccess?: () => void;
}

const DeleteSpeed = ({ speed, onSuccess }: DeleteSpeedProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteSpeedBySlugAction(speed.slug),
  });

  const handleDelete = async () => {
    setServerError(null);
    const toastId = toast.loading("Deleting speed...");

    try {
      const result = await mutateAsync();

      if (!result.success) {
        const message = result.message || "Failed to delete speed";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["speeds"] });
      toast.success(result.message || "Speed deleted successfully.");
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

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-destructive">{speed.name}</span>?
        </p>
        <p className="text-xs text-muted-foreground">
          This action cannot be undone.
        </p>
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={() => onSuccess?.()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Card>
  );
};

export default DeleteSpeed;
