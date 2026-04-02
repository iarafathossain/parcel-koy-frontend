"use client";

import { collectCashFromRiderAction } from "@/actions/cash-collection-action";
import { getSingleRiderByEmailAction } from "@/actions/rider-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchError } from "@/helpers/catch-error";
import { formatPrice } from "@/helpers/format-price";
import { IRider } from "@/types/user-type";
import {
  CollectCashPayload,
  collectCashZodSchema,
} from "@/validators/collect-cash-validator";
import {
  GetSingleRiderByEmailPayload,
  getSingleRiderByEmailZodSchema,
} from "@/validators/rider-validator";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const CashCollectionPage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [rider, setRider] = useState<IRider | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const { mutateAsync: getRiderByEmail, isPending: isRiderLookupPending } =
    useMutation({
      mutationFn: (payload: GetSingleRiderByEmailPayload) =>
        getSingleRiderByEmailAction(payload),
    });

  const { mutateAsync: collectCash, isPending: isCollectPending } = useMutation(
    {
      mutationFn: ({
        riderId,
        payload,
      }: {
        riderId: string;
        payload: CollectCashPayload;
      }) => collectCashFromRiderAction(riderId, payload),
    },
  );

  const availableCash = Number(rider?.cashInHand || 0);

  const handleFindRider = async () => {
    setServerError(null);
    setServerSuccess(null);

    const parsed = getSingleRiderByEmailZodSchema.safeParse({ email });
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid rider email";
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Looking up rider...");

    try {
      const result = await getRiderByEmail(parsed.data);

      if (!result.success || !result.data) {
        const message = result.message || "Rider not found";
        setServerError(message);
        setRider(null);
        toast.error(message);
        return;
      }

      setRider(result.data);
      setServerSuccess("Rider found. You can now collect cash.");
      toast.success("Rider information loaded");
    } catch (error) {
      const message = catchError(error, "Failed to fetch rider");
      setServerError(message);
      setRider(null);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleCollectCash = async () => {
    setServerError(null);
    setServerSuccess(null);

    if (!rider) {
      const message = "Please find a rider by email first.";
      setServerError(message);
      toast.error(message);
      return;
    }

    const parsed = collectCashZodSchema.safeParse({ amount: Number(amount) });
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid amount";
      setServerError(message);
      toast.error(message);
      return;
    }

    if (parsed.data.amount > availableCash) {
      const message = `Amount cannot exceed rider's available cash (${formatPrice(availableCash)}).`;
      setServerError(message);
      toast.error(message);
      return;
    }

    const toastId = toast.loading("Collecting cash...");

    try {
      const result = await collectCash({
        riderId: rider.id,
        payload: parsed.data,
      });

      if (!result.success) {
        const message = result.message || "Failed to collect cash";
        setServerError(message);
        toast.error(message);
        return;
      }

      setServerSuccess(result.message || "Cash collected successfully.");
      toast.success(result.message || "Cash collected successfully.");
      setAmount("");

      // Re-fetch rider to refresh available cash after successful collection
      const refreshedRider = await getRiderByEmail({ email: rider.user.email });
      if (refreshedRider.success && refreshedRider.data) {
        setRider(refreshedRider.data);
      }
    } catch (error) {
      const message = catchError(error, "Failed to collect cash");
      setServerError(message);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Cash Collections</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find a rider by email and collect available cash from their account.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Rider</CardTitle>
          <CardDescription>
            Enter rider email to load rider details and available cash.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
            <div className="space-y-1.5">
              <Label htmlFor="rider-email">Rider Email</Label>
              <Input
                id="rider-email"
                type="email"
                placeholder="Enter rider email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isRiderLookupPending || isCollectPending}
              />
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleFindRider}
                disabled={isRiderLookupPending || isCollectPending}
              >
                {isRiderLookupPending ? "Searching..." : "Find Rider"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collect Cash</CardTitle>
          <CardDescription>
            Rider ID and available cash are auto-populated after rider lookup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="rider-id">Rider ID</Label>
              <Input id="rider-id" value={rider?.id || ""} disabled />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="available-cash">Available Cash</Label>
              <Input
                id="available-cash"
                value={rider ? formatPrice(availableCash) : ""}
                disabled
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="collect-amount">Collect Amount</Label>
            <Input
              id="collect-amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount to collect"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!rider || isCollectPending || isRiderLookupPending}
            />
          </div>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {serverSuccess && (
            <Alert>
              <AlertDescription>{serverSuccess}</AlertDescription>
            </Alert>
          )}

          <Button
            type="button"
            onClick={handleCollectCash}
            disabled={!rider || isCollectPending || isRiderLookupPending}
          >
            {isCollectPending ? "Collecting..." : "Collect Cash"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashCollectionPage;
