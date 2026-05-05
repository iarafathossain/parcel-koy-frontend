import LoadingShell from "@/components/shared/loading/loading-shell";
import { Suspense } from "react";

import MerchantDashboard from "@/components/modules/merchant/dashboard/merchant-dashboard";

const MerchantDashboardPage = () => {
  return (
    <Suspense fallback={<LoadingShell variant="merchantDashboard" />}>
      <MerchantDashboard />
    </Suspense>
  );
};

export default MerchantDashboardPage;
