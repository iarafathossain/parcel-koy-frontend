import DashboardNavbar from "@/components/modules/dashboard/dashboard-navbar";
import DashboardSidebar from "@/components/modules/dashboard/dashboard-sidebar";
import { ReactNode } from "react";

export default function RootDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Dashboard Sidebar - desktop */}
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* mobile navbar */}
        <DashboardNavbar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
