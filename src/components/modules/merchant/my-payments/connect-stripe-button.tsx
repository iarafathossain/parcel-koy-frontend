"use client";

import { connectStripeOnboardAction } from "@/actions/payment-account-action";
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
import { catchError } from "@/helpers/catch-error";
import { stripeConnectOnboardingZodSchema } from "@/validators/payment-account-validator";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ConnectStripeButton = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        successReturnUrl: `${window.location.origin}/merchant/my-payments/stripe-connect/verify`,
        refreshUrl: `${window.location.origin}/merchant/my-payments`,
      };

      const parsed = stripeConnectOnboardingZodSchema.safeParse(payload);

      if (!parsed.success) {
        throw new Error(
          parsed.error.issues[0]?.message || "Invalid URL payload",
        );
      }

      return await connectStripeOnboardAction(parsed.data);
    },
  });

  const handleConnectStripe = async () => {
    setServerError(null);
    const toastId = toast.loading("Creating Stripe onboarding session...");

    try {
      const result = await mutateAsync();
      const onboardingUrl = result.data?.url;

      if (!onboardingUrl) {
        const message = "Stripe onboarding URL was not returned";
        setServerError(message);
        toast.error(message);
        return;
      }

      window.location.href = onboardingUrl;
    } catch (error) {
      const message = catchError(
        error,
        "Failed to start Stripe onboarding. Please try again.",
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
        <CardTitle>Stripe Connect</CardTitle>
        <CardDescription>
          Connect your Stripe account to receive payouts from delivered parcels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleConnectStripe} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            "Connect Stripe"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectStripeButton;
