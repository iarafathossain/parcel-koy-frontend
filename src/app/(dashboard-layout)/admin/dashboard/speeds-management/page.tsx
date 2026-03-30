import SpeedTable from "@/components/modules/admin/speed-management/speed-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { speedServices } from "@/services/speed-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const SpeedsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["speeds", queryString],
    queryFn: () => speedServices.getAllSpeeds(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SpeedTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default SpeedsManagementPage;
