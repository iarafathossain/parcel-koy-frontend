import MethodTable from "@/components/modules/admin/method-management/method-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { methodServices } from "@/services/method-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const MethodsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["methods", queryString],
    queryFn: () => methodServices.getAllMethods(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MethodTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default MethodsManagementPage;
