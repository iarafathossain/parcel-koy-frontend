import CreateParcelMethodCards from "@/components/modules/merchant/create-parcel/create-parcel-method-cards";
import { methodServices } from "@/services/method-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const CreateParcelPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pickup-methods"],
    queryFn: () => methodServices.getAllPickupMethods(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateParcelMethodCards />
    </HydrationBoundary>
  );
};

export default CreateParcelPage;
