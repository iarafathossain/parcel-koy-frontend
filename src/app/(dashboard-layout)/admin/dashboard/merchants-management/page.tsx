import MerchantTable from "@/components/modules/admin/merchant-management/merchant-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { merchantServices } from "@/services/merchant-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const MerchantsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["merchants"],
    queryFn: () => merchantServices.getAllMerchants(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MerchantTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default MerchantsManagementPage;
