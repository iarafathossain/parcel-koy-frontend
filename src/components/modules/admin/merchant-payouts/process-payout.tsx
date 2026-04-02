"use client";

import { processPayoutAction } from "@/actions/payout-action";
import { Button } from "@/components/ui/button";
import { catchError } from "@/helpers/catch-error";
import { formatPrice } from "@/helpers/format-price";
import { IPayout } from "@/types/payout-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProcessPayoutProps {
  payout: IPayout;
  onSuccess: () => void;
}

const ProcessPayout = ({ payout, onSuccess }: ProcessPayoutProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: processPayoutAction,
  });

  const handleProcess = async () => {
    const toastId = toast.loading("Processing payout...");

    try {
      const result = await mutateAsync({ payoutId: payout.id });

      if (!result.success) {
        toast.error(result.message || "Failed to process payout");
        return;
      }

      toast.success(result.message || "Payout processed successfully");
      await queryClient.invalidateQueries({
        queryKey: ["pending-payouts"],
        exact: false,
      });
      onSuccess();
    } catch (error) {
      toast.error(catchError(error, "Failed to process payout"));
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          You are about to process this payout request.
        </p>
        <p className="text-sm">
          <span className="font-medium">Payout ID:</span>{" "}
          {payout.payoutId || payout.id}
        </p>
        <p className="text-sm">
          <span className="font-medium">Merchant:</span>{" "}
          {payout.merchant?.businessName || "N/A"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Amount:</span>{" "}
          {formatPrice(Number(payout.amount || 0))}
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSuccess} disabled={isPending}>
          Cancel
        </Button>
        <Button onClick={handleProcess} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm Process"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProcessPayout;
