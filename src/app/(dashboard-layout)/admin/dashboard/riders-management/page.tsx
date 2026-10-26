import RiderTable from "@/components/modules/admin/rider-management/rider-table";
import LoadingShell from "@/components/shared/loading/loading-shell";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { riderServices } from "@/services/rider-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

const RidersManagementContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["riders", queryString],
    queryFn: () => riderServices.getAllRiders(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RiderTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

const RidersManagementPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Riders Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage rider accounts and their access.
        </p>
      </header>

      <Suspense fallback={<LoadingShell variant="protectedRoute" />}>
        <RidersManagementContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default RidersManagementPage;
