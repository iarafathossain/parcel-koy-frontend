import { Card } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import { getCapitalized } from "@/helpers/get-capitalized";
import { IPayout } from "@/types/payout-type";

interface ViewTransactionProps {
  transaction: IPayout;
}

const ViewTransaction = ({ transaction }: ViewTransactionProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Transaction
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Payout ID</p>
            <p className="text-sm font-medium">
              {transaction.payoutId || transaction.id}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Transaction ID</p>
            <p className="text-sm font-medium">
              {transaction.transactionId || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-medium">
              {getCapitalized(String(transaction.status).toLowerCase())}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="text-sm font-medium">
              {formatPrice(Number(transaction.amount || 0))}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="text-sm font-medium">
              {transaction.createdAt
                ? new Date(transaction.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Updated At</p>
            <p className="text-sm font-medium">
              {transaction.updatedAt
                ? new Date(transaction.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-muted-foreground">Admin Note</p>
            <p className="text-sm font-medium">
              {transaction.adminNote || "N/A"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Merchant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Business Name</p>
            <p className="text-sm font-medium">
              {transaction.merchant?.businessName || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Owner Name</p>
            <p className="text-sm font-medium">
              {transaction.merchant?.user?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">
              {transaction.merchant?.user?.email || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">
              {transaction.merchant?.user?.contactNumber || "N/A"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Payment Gateway Data
        </h3>
        <pre className="text-xs whitespace-pre-wrap break-all rounded-md bg-muted p-3 overflow-auto">
          {JSON.stringify(transaction.paymentGatewayData ?? {}, null, 2)}
        </pre>
      </Card>
    </div>
  );
};

export default ViewTransaction;
