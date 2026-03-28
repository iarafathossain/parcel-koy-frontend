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

  console.log("Search string:", queryString);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hubs"],
    queryFn: hubServices.getAllHubs,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>Hub Management Page - Under Construction</div>
    </HydrationBoundary>
  );
};

export default HubManagementPage;
