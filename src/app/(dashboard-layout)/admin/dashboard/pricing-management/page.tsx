import PricingTable from "@/components/modules/admin/pricing-management/pricing-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { pricingServices } from "@/services/pricing-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const PricingManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pricing-rules", queryString],
    queryFn: () => pricingServices.getAllPricing(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PricingTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default PricingManagementPage;
