import ProcessPayoutPanel from "@/components/modules/admin/merchant-payouts/process-payout-panel";

const MerchantPayoutsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Merchant Payouts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Process payout requests from merchants.
        </p>
      </div>

      <ProcessPayoutPanel />
    </div>
  );
};

export default MerchantPayoutsPage;
