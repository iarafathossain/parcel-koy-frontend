import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/nav-items";
import { userServices } from "@/services/user-service";
import { NavSection } from "@/types/dashboard-type";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./nav-items";
import UserLabel from "./user-label";

const DashboardSidebar = async () => {
  const userInfo = await userServices.getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <div className="hidden md:flex flex-col h-full w-64 border-r bg-card overflow-hidden">
      {/* logo */}
      <div className="h-16 flex items-center px-6 py-3 border-b relative overflow-hidden">
        <Link href={dashboardHome}>
          <Image
            loading="eager"
            src="/logo.png"
            alt="Logo"
            width={320}
            height={64}
          />
        </Link>
      </div>
      {/* navigation area */}
      <NavItems navItems={navItems} />

      {/* user info at bottom */}
      <UserLabel userInfo={userInfo} />
    </div>
  );
};

export default DashboardSidebar;
