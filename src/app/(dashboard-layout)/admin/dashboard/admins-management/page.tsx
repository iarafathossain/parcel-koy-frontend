import AdminTable from "@/components/modules/admin/admin-management/admin-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { adminServices } from "@/services/admin-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AdminsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admins"],
    queryFn: () => adminServices.getAllAdmins(queryString),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default AdminsManagementPage;
