import RiderTable from "@/components/modules/admin/rider-management/rider-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { riderServices } from "@/services/rider-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const RidersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["riders"],
    queryFn: () => riderServices.getAllRiders(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RiderTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default RidersManagementPage;
