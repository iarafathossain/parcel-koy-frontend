import { AssignmentTable } from "@/components/modules/rider/my-assigned-parcels/assignment-table";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { riderServices } from "@/services/rider-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata = {
  title: "My Assigned Parcels | Rider Dashboard",
  description: "Manage all your assigned pickup and delivery parcels.",
};

const MyAssignedParcelsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-assigned-parcels", queryString],
    queryFn: () => riderServices.getMyAssignedParcels(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              My Assigned Parcels
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage, update, and verify all your pickup and delivery
              assignments from one central view.
            </p>
          </div>
        </div>

        <div className="bg-background rounded-lg border shadow-sm p-4">
          <AssignmentTable initialQueryString={queryString} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default MyAssignedParcelsPage;
