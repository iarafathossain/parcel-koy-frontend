"use client";

import { clearDueCheckoutAction } from "@/actions/payment-account-action";
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
import { useMutation } from "@tanstack/react-query";
import { Loader2, RotateCcw, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const PaymentCancelPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: clearDueCheckoutAction,
  });

  const handleRetryCheckout = async () => {
    setServerError(null);
    const toastId = toast.loading("Creating checkout session...");

    try {
      const result = await mutateAsync();
      const checkoutUrl = result.data?.url;

      if (!checkoutUrl) {
        const message = "Checkout URL was not returned";
        setServerError(message);
        toast.error(message);
        return;
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      const message = catchError(
        error,
        "Failed to start checkout again. Please try one more time.",
      );
      setServerError(message);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-rose-600">
            <XCircle className="h-5 w-5" />
            Payment Cancelled
          </CardTitle>
          <CardDescription>
            Your due payment was not completed. You can retry checkout now to
            clear your outstanding due.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertDescription>
              If you closed Stripe or cancelled by mistake, click Retry Checkout
              to continue payment.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          <Button onClick={handleRetryCheckout} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Retry Checkout
              </>
            )}
          </Button>

          <Button asChild variant="outline">
            <Link href="/merchant/my-payments">Back To My Payments</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link href="/merchant">Go To Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
