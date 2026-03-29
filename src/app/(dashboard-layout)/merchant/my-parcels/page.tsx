import MerchantParcelsTable from "@/components/modules/merchant/my-parcels/merchant-parcels-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { merchantServices } from "@/services/merchant-service";
import { userServices } from "@/services/user-service";
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
  const user = await userServices.getUserInfo();

  if (!user || !user.merchantProfile) {
    throw new Error("Unauthorized: No user found");
  }

  const merchantId = user.merchantProfile.id;

  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["parcels", merchantId],
    queryFn: () => merchantServices.getParcels(merchantId, queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MerchantParcelsTable
        merchantId={merchantId}
        initialQueryString={queryString}
      />
    </HydrationBoundary>
  );
};

export default MyParcelsPage;
