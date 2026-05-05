import LoadingShell from "@/components/shared/loading/loading-shell";
import { Suspense } from "react";

import AdminDashboard from "@/components/modules/admin/dashboard/admin-dashboard";

const AdminDashboardPage = () => {
  return (
    <Suspense fallback={<LoadingShell variant="adminDashboard" />}>
      <AdminDashboard />
    </Suspense>
  );
};

export default AdminDashboardPage;
