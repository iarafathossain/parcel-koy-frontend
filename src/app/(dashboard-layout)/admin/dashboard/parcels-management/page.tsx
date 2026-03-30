import ParcelTable from "@/components/modules/admin/parcel-management/parcel-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { parcelServices } from "@/services/parcel-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ParcelsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;
  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["parcels"],
    queryFn: () => parcelServices.getAllParcels(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ParcelTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default ParcelsManagementPage;
