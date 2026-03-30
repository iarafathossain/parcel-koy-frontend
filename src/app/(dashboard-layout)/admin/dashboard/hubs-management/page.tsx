import HubTable from "@/components/modules/admin/hub-management/hub-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { hubServices } from "@/services/hub-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const HubManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hubs", queryString],
    queryFn: () => hubServices.getAllHubs(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HubTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default HubManagementPage;
