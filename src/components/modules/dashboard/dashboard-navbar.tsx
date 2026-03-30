import { ThemeSwitch } from "@/components/shared/theme-switch";
import { Input } from "@/components/ui/input";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getCurrentUserFromToken } from "@/lib/current-user";
import { getNavItemsByRole } from "@/lib/nav-items";
import { NavSection } from "@/types/dashboard-type";
import { Search } from "lucide-react";
import DashboardNavbarContent from "./dashboard-navbar-content";
import NotificationDropdown from "./notification-dropdown";
import UserDropdown from "./user-dropdown";

const DashboardNavbar = async () => {
  const userInfo = await getCurrentUserFromToken();
  if (!userInfo) {
    return null;
  }
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <div className="h-16 shrink-0 flex items-center gap-4 w-full px-4 border-b bg-background">
      {/* mobile toggle menu button and menu */}
      <DashboardNavbarContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
      {/* search component */}
      <div className="flex-1 flex items-center">
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search..." className="pl-9 pr-4" />
        </div>
      </div>

      {/* right sidebar actions */}
      <div className="flex items-center gap-2">
        {/* notifications dropdown */}
        <NotificationDropdown />
        {/* user dropdown menu */}
        <UserDropdown userInfo={userInfo} />
      </div>

      {/* theme switcher */}
      <ThemeSwitch />
    </div>
  );
};

export default DashboardNavbar;
