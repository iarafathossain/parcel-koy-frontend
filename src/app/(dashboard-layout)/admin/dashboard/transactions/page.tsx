import TransactionsTable from "@/components/modules/admin/transactions/transactions-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { payoutServices } from "@/services/payout-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["transactions", queryString],
    queryFn: () => payoutServices.getAllTransactions(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View all payout transactions and gateway transfer details.
          </p>
        </div>

        <TransactionsTable initialQueryString={queryString} />
      </div>
    </HydrationBoundary>
  );
};

export default TransactionsPage;
