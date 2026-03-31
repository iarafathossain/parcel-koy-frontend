"use client";

import { clearDueCheckoutAction } from "@/actions/payment-account-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { catchError } from "@/helpers/catch-error";
import { formatPrice } from "@/helpers/format-price";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MerchantBalanceCardProps {
  balance: number;
}

const MerchantBalanceCard = ({ balance }: MerchantBalanceCardProps) => {
  const router = useRouter();
  const isNegative = balance < 0;
  const absoluteBalance = Math.abs(balance);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: clearDueCheckoutAction,
  });

  const handleAction = async () => {
    if (!isNegative) {
      router.push("/merchant/my-payments");
      return;
    }

    const toastId = toast.loading("Creating checkout session...");

    try {
      const result = await mutateAsync();
      const checkoutUrl = result.data?.url;

      if (!checkoutUrl) {
        const message = "Checkout URL was not returned";
        toast.error(message);
        return;
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error(
        catchError(
          error,
          "Failed to create checkout session. Please try again.",
        ),
      );
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/5 to-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Account Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">
                {isNegative ? "-" : "+"}
                {formatPrice(absoluteBalance)}
              </span>
              {isNegative ? (
                <TrendingDown className="w-6 h-6 text-destructive" />
              ) : (
                <TrendingUp className="w-6 h-6 text-success" />
              )}
            </div>
          </div>

          {isNegative && (
            <div className="flex items-start gap-2 bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm text-destructive">
                <p className="font-medium">Outstanding Balance Due</p>
                <p className="text-xs mt-1">
                  You have a due amount of {formatPrice(absoluteBalance)}
                </p>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            variant={isNegative ? "destructive" : "default"}
            onClick={handleAction}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : isNegative ? (
              "Clear Due"
            ) : (
              "Make Payout Request"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchantBalanceCard;
