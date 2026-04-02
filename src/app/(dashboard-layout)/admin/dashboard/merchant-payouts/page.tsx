import PayoutTable from "@/components/modules/admin/merchant-payouts/payout-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { payoutServices } from "@/services/payout-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const MerchantPayoutsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pending-payouts", queryString],
    queryFn: () => payoutServices.getAllPendingPayouts(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Merchant All Pending Payouts
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Process payout requests from merchants.
          </p>
        </div>

        <PayoutTable initialQueryString={queryString} />
      </div>
    </HydrationBoundary>
  );
};

export default MerchantPayoutsPage;
