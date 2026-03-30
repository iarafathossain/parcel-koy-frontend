import ZoneTable from "@/components/modules/admin/zone-management/zone-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { zoneServices } from "@/services/zone-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ZoneManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["zones", queryString],
    queryFn: () => zoneServices.getAllZones(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ZoneTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default ZoneManagementPage;
