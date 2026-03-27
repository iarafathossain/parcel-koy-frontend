"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { IUserInfo } from "@/types/auth-type";
import { NavSection } from "@/types/dashboard-type";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NavItems from "./nav-items";
import UserLabel from "./user-label";

interface DashboardNavbarContentProps {
  userInfo: IUserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  return (
    <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant={"outline"} size={"icon"}>
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Logo / Brand */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href={dashboardHome}>
              <span className="text-xl font-bold text-primary">
                PH Healthcare
              </span>
            </Link>
          </div>

          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          {/* navigation area */}
          <NavItems navItems={navItems} />

          {/* user info */}
          <UserLabel userInfo={userInfo} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardNavbarContent;
