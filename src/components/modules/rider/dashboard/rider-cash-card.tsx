"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { TrendingUp, Wallet } from "lucide-react";

interface RiderCashCardProps {
  cashInHand: number;
}

const RiderCashCard = ({ cashInHand }: RiderCashCardProps) => {
  return (
    <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/5 to-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Cash in Hand
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">
                {formatPrice(cashInHand)}
              </span>
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Total cash collected from deliveries
          </p>

          <Button className="w-full" variant="outline">
            <Wallet className="w-4 h-4 mr-2" />
            Handover Cash
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiderCashCard;
