"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ProcessPayoutButton from "./process-payout-button";

const ProcessPayoutPanel = () => {
  const [payoutId, setPayoutId] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Merchant Payout</CardTitle>
        <CardDescription>
          Enter a payout ID and process it from the admin dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="process-payout-id">Payout ID</Label>
          <Input
            id="process-payout-id"
            value={payoutId}
            onChange={(event) => setPayoutId(event.target.value)}
            placeholder="Enter payout ID"
          />
        </div>

        <ProcessPayoutButton payoutId={payoutId} disabled={!payoutId.trim()} />
      </CardContent>
    </Card>
  );
};

export default ProcessPayoutPanel;
