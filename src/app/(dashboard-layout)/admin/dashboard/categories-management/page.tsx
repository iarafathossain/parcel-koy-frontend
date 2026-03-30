import CategoryTable from "@/components/modules/admin/category-management/category-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { categoryServices } from "@/services/category-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const CategoriesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories", queryString],
    queryFn: () => categoryServices.getAllCategories(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default CategoriesManagementPage;
