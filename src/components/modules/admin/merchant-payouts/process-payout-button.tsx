"use client";

import { processPayoutAction } from "@/actions/payout-action";
import { Button } from "@/components/ui/button";
import { catchError } from "@/helpers/catch-error";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProcessPayoutButtonProps = {
  payoutId: string;
  disabled?: boolean;
};

const ProcessPayoutButton = ({
  payoutId,
  disabled = false,
}: ProcessPayoutButtonProps) => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: processPayoutAction,
  });

  const handleProcessPayout = async () => {
    const normalizedPayoutId = payoutId.trim();

    if (!normalizedPayoutId) {
      toast.error("Payout ID is required");
      return;
    }

    const toastId = toast.loading("Processing payout...");

    try {
      const result = await mutateAsync(normalizedPayoutId);

      if (!result.success) {
        toast.error(result.message || "Failed to process payout");
        return;
      }

      toast.success(result.message || "Payout processed successfully.");
      router.refresh();
    } catch (error) {
      toast.error(catchError(error, "Failed to process payout."));
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleProcessPayout}
      disabled={disabled || isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Process Payout"
      )}
    </Button>
  );
};

export default ProcessPayoutButton;
