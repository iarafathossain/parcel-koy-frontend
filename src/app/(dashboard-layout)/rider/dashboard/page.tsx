import LoadingShell from "@/components/shared/loading/loading-shell";
import { Suspense } from "react";

import RiderDashboard from "@/components/modules/rider/dashboard/rider-dashboard";

const RiderDashboardPage = () => {
  return (
    <Suspense fallback={<LoadingShell variant="riderDashboard" />}>
      <RiderDashboard />
    </Suspense>
  );
};

export default RiderDashboardPage;
