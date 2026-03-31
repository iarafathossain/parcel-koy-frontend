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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PayDuesButtonProps {
  dueAmount: number;
}

const PayDuesButton = ({ dueAmount }: PayDuesButtonProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const hasDue = dueAmount > 0;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: clearDueCheckoutAction,
  });

  const handlePayDues = async () => {
    if (!hasDue) {
      return;
    }

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
        "Failed to create checkout session. Please try again.",
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
        <CardTitle>Clear Dues</CardTitle>
        <CardDescription>
          {hasDue
            ? "Pay outstanding platform dues securely using Stripe Checkout."
            : "Congrats, you have no due to pay."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {!hasDue && !serverError && (
          <Alert>
            <AlertDescription>
              Congrats, you have no due to pay.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePayDues} disabled={isPending || !hasDue}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : hasDue ? (
            "Pay Dues"
          ) : (
            "No Due"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayDuesButton;
