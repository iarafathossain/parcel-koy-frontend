"use client";

import { verifyStripeConnectAction } from "@/actions/payment-account-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const StripeConnectVerificationStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  useEffect(() => {
    let isMounted = true;

    const verifyStripe = async () => {
      setIsLoading(true);
      setServerError(null);

      try {
        if (!accountId) {
          return setServerError("Missing Stripe Account ID in URL parameters.");
        }
        await verifyStripeConnectAction(accountId);
      } catch (error) {
        if (isMounted) {
          setServerError(
            catchError(error, "Failed to verify Stripe account. Please retry."),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifyStripe();

    return () => {
      isMounted = false;
    };
  }, [accountId]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verifying Stripe Account</CardTitle>
          <CardDescription>
            Please wait while we confirm your Stripe Connect status.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Verifying...
        </CardContent>
      </Card>
    );
  }

  if (serverError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stripe Verification Failed</CardTitle>
          <CardDescription>
            We could not confirm your Stripe account connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          Stripe Connected
        </CardTitle>
        <CardDescription>
          Your Stripe account is now connected and verified.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Connected Account ID</p>
        <p className="mt-1 font-mono text-sm">{accountId}</p>
      </CardContent>
    </Card>
  );
};

export default StripeConnectVerificationStatus;
