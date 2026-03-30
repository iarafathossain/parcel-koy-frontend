"use client";

import { deletePricingByIdAction } from "@/actions/pricing-action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { IPricingRule } from "@/types/pricing-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface DeletePricingRuleProps {
  rule: IPricingRule;
  onSuccess?: () => void;
}

const DeletePricingRule = ({ rule, onSuccess }: DeletePricingRuleProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deletePricingByIdAction(rule.id),
  });

  const handleDelete = async () => {
    setServerError(null);
    const toastId = toast.loading("Deleting pricing rule...");

    try {
      const result = await mutateAsync();

      if (!result.success) {
        const message = result.message || "Failed to delete pricing rule";
        setServerError(message);
        toast.error(message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["pricing-rules"] });
      toast.success(result.message || "Pricing rule deleted successfully.");
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
          Are you sure you want to delete this pricing rule?
        </p>
        <p className="text-xs text-muted-foreground break-all">
          Rule ID: {rule.id}
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

export default DeletePricingRule;
