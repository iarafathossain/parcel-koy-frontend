"use client";

import { requestPayoutAction } from "@/actions/payout-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchError } from "@/helpers/catch-error";
import { formatPrice } from "@/helpers/format-price";
import { parseNumber } from "@/helpers/parse-number";
import { requestPayoutZodSchema } from "@/validators/payout-validator";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RequestPayoutFormProps {
  availableBalance: number;
}

const RequestPayoutForm = ({ availableBalance }: RequestPayoutFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);
  const hasAvailableBalance = availableBalance > 0;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: requestPayoutAction,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const parsedAmount = parseNumber(amount, "Amount");

    if (parsedAmount.error || parsedAmount.value === null) {
      const message = parsedAmount.error || "Amount is required";
      setServerError(message);
      toast.error(message);
      return;
    }

    const parsedPayload = requestPayoutZodSchema.safeParse({
      amount: parsedAmount.value,
    });

    if (!parsedPayload.success) {
      const message =
        parsedPayload.error.issues[0]?.message || "Invalid amount";
      setServerError(message);
      toast.error(message);
      return;
    }

    if (parsedPayload.data.amount > availableBalance) {
      const message = `Payout amount cannot exceed available balance (${formatPrice(availableBalance)}).`;
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Submitting payout request...");

    try {
      const result = await mutateAsync(parsedPayload.data);

      if (!result.success) {
        const message = result.message || "Failed to request payout";
        setServerError(message);
        toast.error(message);
        return;
      }

      toast.success(result.message || "Payout request created successfully.");
      setAmount("");
    } catch (error) {
      const message = catchError(
        error,
        "Failed to submit payout request. Please try again.",
      );
      setServerError(message);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Payout</CardTitle>
        <CardDescription>
          Submit a payout request for your available merchant balance.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="payout-amount">Amount</Label>
            <Input
              id="payout-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="Enter payout amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              disabled={isPending || !hasAvailableBalance}
            />
            <p className="text-xs text-muted-foreground">
              Available Balance: {formatPrice(availableBalance)}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending || !hasAvailableBalance}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Requesting...
              </>
            ) : hasAvailableBalance ? (
              "Request Payout"
            ) : (
              "No Balance Available"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestPayoutForm;
