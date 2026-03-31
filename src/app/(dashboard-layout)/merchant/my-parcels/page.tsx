import MerchantParcelsTable from "@/components/modules/merchant/my-parcels/merchant-parcels-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const MyParcelsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MerchantParcelsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default MyParcelsPage;
