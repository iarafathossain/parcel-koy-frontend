import AreaTable from "@/components/modules/admin/area-management/area-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { areaServices } from "@/services/area-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AreasManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["areas", queryString],
    queryFn: () => areaServices.getAllAreas(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AreaTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default AreasManagementPage;
