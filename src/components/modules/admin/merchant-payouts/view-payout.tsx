import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IPayout } from "@/types/payout-type";

interface ViewPayoutProps {
  payout: IPayout;
}

const ViewPayout = ({ payout }: ViewPayoutProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Payout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Payout ID</p>
            <p className="text-sm font-medium">
              {payout.payoutId || payout.id}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-medium">
              {getCapitalized(String(payout.status).toLowerCase())}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="text-sm font-medium">
              {formatPrice(Number(payout.amount || 0))}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Requested At</p>
            <p className="text-sm font-medium">
              {payout.createdAt
                ? new Date(payout.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Processed At</p>
            <p className="text-sm font-medium">
              {payout.processedAt
                ? new Date(payout.processedAt).toLocaleString()
                : "Not processed"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Note</p>
            <p className="text-sm font-medium">{payout.note || "N/A"}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Merchant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Business Name</p>
            <p className="text-sm font-medium">
              {payout.merchant?.businessName || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Owner Name</p>
            <p className="text-sm font-medium">
              {payout.merchant?.user?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">
              {payout.merchant?.user?.email || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">
              {payout.merchant?.user?.contactNumber || "N/A"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewPayout;
